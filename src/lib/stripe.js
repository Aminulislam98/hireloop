import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const PLAN_PRICE_ID = {
  seeker_pro: "price_1Tg9yFAwAhRTRUWPeCkIYSLC",
  seeker_premium: "price_1TgARuAwAhRTRUWPt4BLQ63N",
  recruiter_growth: "price_1TgATxAwAhRTRUWPmu2M9iO0",
  recruiter_enterprise: "price_1TgAUSAwAhRTRUWP9kvaE3rd",
};
