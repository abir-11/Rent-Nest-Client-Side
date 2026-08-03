"use server";

import { cookies } from "next/headers";

export const createCategory = async (data: { name: string; description: string }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const url = `${process.env.BACKEND_API_URL}/api/category`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || "Failed to create category" };
    }

    return { success: true, message: "Category created successfully!" };
  } catch (error) {
    console.error("createCategory Error:", error);
    return { success: false, message: "Something went wrong on the server!" };
  }
};