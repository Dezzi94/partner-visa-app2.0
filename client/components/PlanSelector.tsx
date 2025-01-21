"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { createCheckoutSession } from "@/app/actions/stripe";
import { getPlans } from "@/config";
import { Plan } from "@/types/config";
import { CheckoutSessionData } from "@/types/auth";
import { CheckIcon } from "lucide-react";

export function PlanSelector({
  successUrl = "/login",
  cancelUrl = "/",
  userEmail,
}: {
  successUrl?: string;
  cancelUrl?: string;
  userEmail?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(userEmail || "");
  const plans = getPlans();

  const handleSelectPlan = async (plan: Plan) => {
    if (!userEmail && !email) {
      alert("Please enter your email address to continue.");
      return;
    }

    setIsLoading(true);
    try {
      const checkoutData: CheckoutSessionData = {
        priceId: plan.priceId,
        mode: plan.mode,
        successUrl,
        cancelUrl,
        customerEmail: userEmail || email,
        metadata: {
          planName: plan.name,
        },
        invoice_creation:
          plan.mode === "payment" ? { enabled: true } : undefined,
        tax_id_collection: {
          enabled: true,
          required: "if_supported",
        },
      };

      const checkoutUrl = await createCheckoutSession(checkoutData);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6" id="pricing" data-testid="plan-selector">
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Unlock <strong> permanent access</strong> with a single enchantment ✨
        </p>
      </div>

      {!userEmail && (
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email address (required for tax calculations)
          </label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            data-testid="email-input"
            required
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className="flex flex-col bg-white dark:bg-gray-800"
            data-testid={`plan-card-${plan.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                {plan.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-end mb-2">
                {plan.crossedOutPrice && (
                  <p className="ml-2 mb-0.5 mr-2 text-lg text-gray-500 dark:text-gray-400 line-through">
                    {plan.crossedOutPrice}
                  </p>
                )}
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </p>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2 mb-1">
                  {plan.mode === "subscription" ? "/month" : "one-time"}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {plan.description}
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Plus applicable tax
              </p>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSelectPlan(plan)}
                disabled={isLoading || (!userEmail && !email)}
                className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                data-testid={`select-plan-${plan.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {isLoading ? "Casting..." : `Get ${plan.name}`}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
