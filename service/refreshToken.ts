"use server";

import { cookies } from "next/headers";

export const getNewRefreshToken = async () => {
  try {
    const cookieStore = await cookies();
    //console.log("Cookie Store:", cookieStore);
    const refreshToken = cookieStore.get("refreshToken")?.value || null;


    if (!refreshToken) {
      return {
        success: false,
        message: "User not logged in!",
      };
    }

    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
 
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    return result;
  } catch (error) {
    console.error("getMe Error:", error);

    return {
      success: false,
      message: "Something went wrong!",
    };
  }
};