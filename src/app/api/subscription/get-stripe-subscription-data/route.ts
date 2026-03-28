import { getUserSubscriptionPlan } from "@/stripe/subscription";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const subscriptionPlan = await getUserSubscriptionPlan();
    return NextResponse.json({ subscriptionPlan }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }
}
