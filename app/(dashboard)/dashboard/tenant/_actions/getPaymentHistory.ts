"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app/";

export async function getPaymentHistory() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_BASE_URL}/api/payments`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const data = await res.json();

    console.log("Payment API Response:", data);

    return data;
  } catch (error: any) {
    console.error("Payment history fetch error:", error);
    return { success: false, data: [] };
  }
}