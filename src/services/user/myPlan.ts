/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

export async function getMyPlans(id: string) {
    try {
        const response = await serverFetch.get(`/plan/my-plan/${id}`);
        const result = await response.json();
        return {
            success: result.success,
            data: Array.isArray(result.data) ? result.data : [],
            meta: result.meta,
        };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function createTravelPlan(
  _prevState: any,
  formData: FormData
) {
  const payload = {
    title: formData.get("title") as string,
    destination: formData.get("destination") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    budget: Number(formData.get("budget")),
    travelType: formData.get("travelType") as string,
    description: formData.get("description") as string,
    visibility: formData.get("visibility") === "true",
    
  };


  try {
    const response = await serverFetch.post("/plan/create", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Create travel plan error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create travel plan",
      formData: payload,
    };
  }
}

export async function updateMyPlan(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const validationPayload = {
    title: formData.get("title") as string,
    destination: formData.get("destination") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    budget: Number(formData.get("budget")),
    travelType: formData.get("travelType") as string,
    description: formData.get("description") as string,
    visibility: formData.get("visibility") === "true",
  };

  try {
    const response = await serverFetch.patch(`/plan/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validationPayload),
    });

    const result = await response.json();
    return result;

  } catch (error: any) {
    console.error("Update travel plan error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update travel plan",
      formData: validationPayload,
    };
  }
}

export async function deletePlan(id: string) {
    try {
        const response = await serverFetch.delete(`/plan/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}



