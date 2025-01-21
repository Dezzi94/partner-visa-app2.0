import { jest } from "@jest/globals";

const Stripe = jest.fn().mockReturnValue({
  // Add any Stripe methods you use in your tests here
});

export default Stripe;
