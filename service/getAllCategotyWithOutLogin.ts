"use server"


export const getAllCategotyWithOutLogin=async()=>{


    const res=await fetch(`${process.env.BACKEND_API_URL}/api/category/all`)
    const result=res.json();
    return result;
}