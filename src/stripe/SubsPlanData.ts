import { SubscriptionPlan } from "@/types/subscription";

export const subscriptionData: SubscriptionPlan[] = [
  {
    id: "pro-blog",
    name: "Pro Blogs",
    description: "Read premium contents",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_ID_PRO_PLAN,
    price: 500,
  },
];
