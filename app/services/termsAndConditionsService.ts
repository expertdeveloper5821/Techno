import axiosInstance from "./axiosInstance";

export interface TermsTopic {
  _id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  order: number;
}

export async function getTermsAndConditions(): Promise<TermsTopic[]> {
  const { data } = await axiosInstance.get<{
    success: boolean;
    data: TermsTopic[];
  }>("/api/terms-and-conditions");
  if (!data.success) throw new Error("Failed to fetch terms and conditions");
  return data.data;
}
