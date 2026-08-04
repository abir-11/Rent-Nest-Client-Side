"use server";

import { cookies } from "next/headers";
import { IProperty } from "../_components/AddPropertyForm";

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

export const createProperty = async (payload: IProperty) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const url = `${process.env.BACKEND_API_URL}/api/landlord/properties`;

    // 💡 ব্যাকএন্ড যদি সরাসরি object না চেয়ে req.body.payload বা req.body উভয়টি আশা করতে পারে,
    // সেক্ষেত্রে { payload } অথবা সরাসরি payload পাঠানোর সঠিক ফরমেট:
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      // ব্যাকএন্ড যদি req.body.payload খোজে, তবে { payload } ব্যবহার করুন
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
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