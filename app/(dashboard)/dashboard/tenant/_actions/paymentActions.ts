"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app";

export async function createPayment(rentalItem: any) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const payload = {
      rentalRequestId: rentalItem.id,  
    };

    console.log("Sending Payment Payload:", payload);

    const res = await fetch(`${API_BASE_URL}/api/payments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Payment creation error:", error);
    return { success: false, message: error.message || "Payment initiation failed" };
  }
}