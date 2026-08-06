"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app/";
const BASE_ROUTE = `${API_BASE_URL}/api/complaints`;

export async function getAdminComplaints() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    const res = await fetch(`${BASE_ROUTE}/admin/all`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

   
    
    if (!res.ok) throw new Error("Failed to fetch complaints");
    return await res.json();
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return { data: [] };
  }
}

// Reply to a Complaint
export async function replyComplaintAction(id: string, payload: { adminReply: string; complaintStatus?: string }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    const res = await fetch(`${BASE_ROUTE}/admin/reply/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });
  
    revalidatePath("/dashboard/admin/complaints");
    return await res.json();
  } catch (error) {
    console.error("Error replying to complaint:", error);
    return { success: false, message: "Failed to submit reply" };
  }
}