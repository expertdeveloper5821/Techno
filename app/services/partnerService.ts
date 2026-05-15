import axiosInstance from "./axiosInstance";

export interface Partner {
  _id: string;
  name: string;
  logoGray: string;
  logoColor: string;
}

export async function getPartners(): Promise<Partner[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: Partner[] }>("/api/partners");
  if (!data.success) throw new Error("Failed to fetch partners");
  return data.data;
}
