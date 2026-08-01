"use server";

interface RegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    result: {
      id: string;
      name: string;
      email: string;
      role: string;
      phoneNumber: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      profiles: any[];
    };
  };
  errorMessages?: any; 
}

export async function registerAction(payload: any) {
  try {
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";

    const response = await fetch(`${backendUrl}/api/auth/register`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store", 
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data?.message || "Registration failed. Please try again.",
      };
    }

    return {
      success: true,
      message: data.message || "User created successfully!",
      data: data.data,
    };
  } catch (error: any) {
    console.error("Register Action Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred during registration.",
    };
  }
}