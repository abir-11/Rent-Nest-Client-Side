"use server";

export const getAllProperties = async (query: Record<string, any> = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (query.page) queryParams.append("page", query.page.toString());
    if (query.limit) queryParams.append("limit", query.limit.toString());
    if (query.searchTerm) queryParams.append("searchTerm", query.searchTerm);
    if (query.sortBy) queryParams.append("sortBy", query.sortBy);
    if (query.sortOrder) queryParams.append("sortOrder", query.sortOrder);

    const queryString = queryParams.toString();
    const url = `${process.env.BACKEND_API_URL}/api/properties${queryString ? `?${queryString}` : ""}`;

    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch properties",
        data: [],
        meta: null,
      };
    }

    return result;
  } catch (error) {
    console.error("getAllProperties Error:", error);
    return {
      success: false,
      message: "Something went wrong!",
      data: [],
      meta: null,
    };
  }
};