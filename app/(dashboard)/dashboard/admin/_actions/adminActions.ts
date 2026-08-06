"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://rent-nest-mu.vercel.app/";

// Get All Users
export async function getAdminUsers() {
  try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/admin/users`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

// Get All Properties
export async function getAdminProperties() {
  try {
            const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/admin/properties`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch properties");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

// Get All Rentals
export async function getAdminRentals() {

  try {
            const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/admin/rentals`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch rentals");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

// Update User Status (Active/Inactive/Ban)
export async function updateUserStatus(userId: string, status: string) {
  try {
            const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ status }),
    });
    revalidatePath("/dashboard/admin/users");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update status" };
  }
}

// Update User Role (Admin/Landlord/Tenant)
export async function updateUserRole(userId: string, role: string) {
  try {
            const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/admin/users/role-update/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ role }),
    });
    revalidatePath("/dashboard/admin/users");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update role" };
  }
}






const BASE_ROUTE = `${API_BASE_URL}/api/landlord-requests`; 

export async function getAdminLandlordRequests() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${BASE_ROUTE}/admin`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    if (!res.ok) throw new Error("Failed to fetch landlord requests");
    return await res.json();
  } catch (error) {
    console.error(error);
    return { data: [] };
  }
}

export async function replyLandlordRequestAction(id: string, payload: { adminReply: string; status?: string }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const res = await fetch(`${BASE_ROUTE}/${id}/reply`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
    });
    
    revalidatePath("/dashboard/admin/landlord-requests"); 
    return await res.json();
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to submit reply" };
  }
}

const BASE_ROUTER = `${API_BASE_URL}/api/complaints`;

export async function getAdminComplaints() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    
    const res = await fetch(`${BASE_ROUTER}/admin/all`, {
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
    
    const res = await fetch(`${BASE_ROUTER}/admin/reply/${id}`, {
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