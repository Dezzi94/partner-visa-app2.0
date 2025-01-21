"use server";

import Stripe from "stripe";
import { stripe } from "@/utils/stripe";
import { createClient } from "@/utils/supabase/server";
import { config } from "@/config";
import { CheckoutSessionData, UserStatus } from "@/types/auth";
import { isRateLimited } from "@/lib/auth-utils";

async function createOrRetrieveCustomer(email: string): Promise<string> {
  // Make sure that this hasn't accessed this more than 25 times in a 24 hour period:
  const isLimited = await isRateLimited(email, "stripe_customer_creation", 25);
  if (isLimited) {
    throw new Error("Too many requests");
  }

  const customers = await stripe.customers.list({ email: email, limit: 1 });

  if (customers.data.length > 0) {
    return customers.data[0].id;
  } else {
    const newCustomer = await stripe.customers.create({ email: email });
    return newCustomer.id;
  }
}

export async function createCheckoutSession(
  data: CheckoutSessionData
): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userStatus: UserStatus = {
    auth: user
      ? { type: "Authenticated", userId: user.id }
      : { type: "NotAuthenticated" },
    subscription: { type: "NotSubscribed" },
  };

  let stripeCustomerId: string | null = null;

  if (user) {
    const { data: userData, error } = await supabase
      .from("users")
      .select("stripe_customer_id, is_subscribed, stripe_price_id")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      throw new Error("Failed to fetch user");
    }

    if (userData.is_subscribed) {
      userStatus.subscription = {
        type: "Subscribed",
        planId: userData.stripe_price_id || "",
      };
    }

    stripeCustomerId = userData.stripe_customer_id;
  }

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    line_items: [{ price: data.priceId, quantity: 1 }],
    mode: data.mode,
    success_url: `${config.auth.siteUrl}${data.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.auth.siteUrl}${data.cancelUrl}`,
    metadata: {
      ...data.metadata,
      userStatus: JSON.stringify(userStatus),
    },
    allow_promotion_codes: true,
    billing_address_collection: "required",
    automatic_tax: { enabled: true },
  };

  if (user) {
    sessionParams.client_reference_id = user.id;
    if (stripeCustomerId) {
      sessionParams.customer = stripeCustomerId;
      sessionParams.customer_update = {
        name: "auto",
        address: "auto",
      };
    }
  } else if (data.customerEmail) {
    // Create/retrieve customer for both subscription and one-time payments when email is provided
    stripeCustomerId = await createOrRetrieveCustomer(data.customerEmail);
    sessionParams.customer = stripeCustomerId;
    sessionParams.customer_update = {
      name: "auto",
      address: "auto",
    };
  } else {
    throw new Error("Customer email is required for tax calculations");
  }

  // Add invoice creation for one-time payments
  if (data.mode === "payment" && data.invoice_creation?.enabled) {
    sessionParams.invoice_creation = {
      enabled: data.invoice_creation.enabled,
      invoice_data: data.invoice_creation.invoice_data,
    };
  }

  // Keep tax ID collection separate
  if (data.tax_id_collection?.enabled && sessionParams.customer) {
    sessionParams.tax_id_collection = {
      enabled: true,
    };
  }

  if (data.mode === "subscription") {
    sessionParams.subscription_data = {
      trial_period_days: 14,
      metadata: {
        ...data.metadata,
        userStatus: JSON.stringify(userStatus),
      },
    };
  }

  const session = await stripe.checkout.sessions.create(sessionParams);

  if (session.url) {
    return session.url;
  } else {
    throw new Error("Failed to create checkout session");
  }
}

export async function createBillingPortalSession(): Promise<string> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: userData, error } = await supabase
    .from("users")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (error || !userData?.stripe_customer_id) {
    throw new Error("Failed to fetch Stripe customer ID");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: userData.stripe_customer_id,
    return_url: `${config.auth.siteUrl}${config.auth.dashboardUrl}`,
  });

  return session.url;
}
