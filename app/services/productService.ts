import axiosInstance from "./axiosInstance";

export interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  techStack: string;
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: Product[] }>("/api/products");
  if (!data.success) throw new Error("Failed to fetch products");
  return data.data;
}
