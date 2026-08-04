"use server";

import { cookies } from "next/headers";

// 1. Get Categories for Dropdown
export const getCategories = async () => {
  try {
        const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    const url = `${process.env.BACKEND_API_URL}/api/category`;
     const res = await fetch(url, {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
    const result = await res.json();
    console.log(result);
    return result; 
  } catch (error) {
    console.error("getCategories Error:", error);
    return { success: false, data: [] };
  }
};

// 2. Add New Property 
export const createProperty = async (formData: FormData) => {
  try {


    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const url = `${process.env.BACKEND_API_URL}/api/landlord/properties`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to add property",
      };
    }

    return {
      success: true,
      message: "Property added successfully!",
    };
  } catch (error) {
    console.error("createProperty Error:", error);

    return {
      success: false,
      message: "Something went wrong on the server!",
    };
  }
};