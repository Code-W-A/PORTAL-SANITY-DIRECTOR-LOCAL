"use client";
import { SubsButtonProp } from "@/types/subs-button";
import axios from "axios";
import { integrations, messages } from "../../../integrations.config";
import toast from "react-hot-toast";

const ManageSubscriptionButton = (subsProp: SubsButtonProp) => {
  const { isCurrentPlan, isCanceled } = subsProp;

  const handleClick = async () => {
    if (!integrations?.isStripeEnabled) {
      toast.error(messages?.stripe);
      return;
    }

    try {
      const res = await axios.post("/api/subscription", {
        ...subsProp,
      });

      const session = res.data;

      if (session) {
        window.location.href = session.url ?? "/account";
        if (window.location.pathname === "/account") {
          // Reload the "account" page
          window.location.reload();
        }
      }
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        !isCurrentPlan ? "bg-primary" : isCanceled ? "bg-primary" : "bg-dark"
      } mt-6 inline-block rounded-lg px-7 py-3 text-white hover:opacity-90`}
    >
      {!isCurrentPlan
        ? "Upgrade Plan"
        : isCanceled
          ? "Renew Membership"
          : "Cancel Membership"}
    </button>
  );
};

export default ManageSubscriptionButton;
