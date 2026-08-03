"use server";

import { cookies } from "next/headers"; 

export const updateLandlordProperty = async (id: string, data: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value; 

    const url = `${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`;
    const res = await fetch(url, {
      method: "PUT",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to update property" };
    return result;
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
};