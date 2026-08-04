"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app";

// ১. Data Fetching Action
export async function getRentalRequest() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_BASE_URL}/api/landlord/requests`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Rental Request fetch error:", error);
    return { success: false, data: [] };
  }
}

// ২. Status Update (Approve/Reject) Action
export async function updateRentalRequestStatus(id: string, status: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_BASE_URL}/api/landlord/requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ status }), 
    });

    const data = await res.json();

    if (data.success) {
      revalidatePath("/dashboard/landlord/requests");
    }

    return data;
  } catch (error: any) {
    console.error("Status update error:", error);
    return { success: false, message: "Failed to update status" };
  }
}