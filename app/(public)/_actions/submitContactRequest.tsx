"use server";

import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app/";

export interface ILandlordRequestPayload {
  type: "LANDLORD_REQUEST" | "COMPLAINT";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  nid?: string;
  propertyAddress?: string;
  evidenceUrl?: string;
}

export interface IComplaintPayload {
  subject?: string;
  message: string;
}

// ১. Landlord Request পাঠানোর জন্য Action
export async function submitLandlordRequest(payload: ILandlordRequestPayload) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_BASE_URL}/api/landlord-requests`, {
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
    console.error("Landlord request error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit landlord request",
    };
  }
}

// ২. Complaint পাঠানোর জন্য Action
export async function submitComplaint(payload: IComplaintPayload) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${API_BASE_URL}/api/complaints/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });
  
    const data = await res.json();
    console.log("Complaint request error:",data);
    return data;
  } catch (error: any) {
    console.error("Complaint request error:", error);
    return {
      success: false,
      message: error.message || "Failed to submit complaint",
    };
  }
}