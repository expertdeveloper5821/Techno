import axiosInstance from "./axiosInstance";

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  meta?: string;
}

export async function getFAQs(): Promise<FAQ[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: FAQ[] }>("/api/faqs");
  if (!data.success) throw new Error("Failed to fetch FAQs");
  return data.data;
}
