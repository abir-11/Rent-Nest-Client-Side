"use server";

export const getSingleProperty = async (id: string) => {
  try {
    const url = `${process.env.BACKEND_API_URL}/api/properties/${id}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch property",
        data: null,
        meta: null,
      };
    }

    return result;
  } catch (error) {
    console.error("getSingleProperty Error:", error);
    return {
      success: false,
      message: "Something went wrong!",
      data: null,
      meta: null,
    };
  }
};



  

  