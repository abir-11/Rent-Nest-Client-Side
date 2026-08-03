"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3000";

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