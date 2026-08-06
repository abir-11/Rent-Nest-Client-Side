"use server";

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app/";

export async function getMyComplaintsAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    const res = await fetch(`${API_BASE_URL}/api/complaints/my-complaints`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!res.ok) throw new Error("Failed to fetch my complaints");
    return await res.json();
  } catch (error) {
    console.error("Error fetching my complaints:", error);
    return { data: [] };
  }
}