"use server";

import { cookies } from "next/headers"; 

export const deleteLandlordProperty = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value; 

    const url = `${process.env.BACKEND_API_URL}/api/landlord/properties/${id}`;
    const res = await fetch(url, {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      }
    });

    const result = await res.json();
    if (!res.ok) return { success: false, message: result.message || "Failed to delete property" };
    return result;
  } catch (error) {
    return { success: false, message: "Something went wrong!" };
  }
};