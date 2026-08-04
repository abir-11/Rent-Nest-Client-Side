"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app/";

export async function getTenantRentals() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_BASE_URL}/api/rentals`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!res.ok) throw new Error("Failed to fetch rentals");

    const data = await res.json();

    console.log("Fetched Rentals Data:", data);

    return data;
  } catch (error: any) {
    console.error("Rentals fetch error:", error);
    return { success: false, data: [] };
  }
}

export async function postTenantRentals() {
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
    });

    if (!res.ok) throw new Error("Failed to fetch rentals");
    return await res.json();
  } catch (error: any) {
    console.error("Rentals fetch error:", error);
    return { success: false, data: [] };
  }
}

export async function createPayment(rentalId: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_BASE_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ rentalId }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to initiate payment",
      };
    }

    return {
      success: true,
      url: data?.paymentUrl || data?.url, // Stripe/SSLCommerz redirection URL
    };
  } catch (error: any) {
    console.error("Payment create error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong!",
    };
  }
}