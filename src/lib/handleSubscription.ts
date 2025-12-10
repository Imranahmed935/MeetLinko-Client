import { getUserInfo } from "@/services/auth/getUserInfo";
import { serverFetch } from "./server-fetch";

export const handleSubscribe = async (planType: string) => {
    console.log(planType)
    try {
      const user = await getUserInfo();
      console.log(user)
      const res = await serverFetch.post("/payment/create-checkout-session", {
        body: JSON.stringify({ planType, userId: user.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) window.location.href = data.data.url;
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
    }
  };