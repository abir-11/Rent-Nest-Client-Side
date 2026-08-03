"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000";

// Get Current User Profile
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

// Update Profile
export async function updateMyProfile(updateData: {
  name: string;
  phoneNumber: string;
  profilePhoto: string;
  bio: string;
  address: string;
}) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    const res = await fetch(`${API_BASE_URL}/api/auth/me/profile-update`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(updateData),
    });

    console.log("-----------------------------------------");
    console.log("Sending Update Request to:", res);
    console.log("Payload:", updateData);
    
    revalidatePath("/dashboard/profile"); 
    return await res.json();
  } catch (error) {
    console.error("Profile update error:", error);
    return { success: false, message: "Failed to update profile" };
  }
}