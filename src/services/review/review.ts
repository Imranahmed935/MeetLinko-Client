// "use server"

// import { serverFetch } from "@/lib/server-fetch";

// export const handleAddReview = async (data: { rating: number; comment: string }) => {
//   try {
//     const res = await serverFetch.post("/review/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...data, travelPlanId: initialDetails.id }),
//     });
//      const result = await res.json()
//      console.log(result)
//   } catch (error) {
//     console.error("Failed to add review:", error);
//   }
// };
