"use server";

import { cookies } from "next/headers"; 

export const getLandLordProperties = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value; 

    const url = `${process.env.BACKEND_API_URL}/api/landlord/properties`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch property",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("getLandLordProperties Error:", error);
    return {
      success: false,
      message: "Something went wrong!",
      data: [],
    };
  }
};