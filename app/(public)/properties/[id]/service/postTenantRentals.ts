"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app/";

export interface RentalRequestPayload {
  propertyId: string;
  message: string;
  startDate: string;
  endDate: string;
}

export async function postTenantRentals(payload: RentalRequestPayload) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_BASE_URL}/api/rentals`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    const responseText = await res.text();

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("API returned non-JSON response:", responseText.substring(0, 150));
      throw new Error(`API Error: Status ${res.status}. Expected JSON but got HTML.`);
    }

    if (!res.ok) {
      throw new Error(data.message || "Failed to submit rental request");
    }
    
    return data;
  } catch (error: any) {
    console.error("Rentals fetch error:", error);
    return { success: false, message: error.message };
  }
}

export async function getMyProfile() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  } catch (error) {
    console.error("Profile fetch error:", error);
    return { data: null };
  }
}
