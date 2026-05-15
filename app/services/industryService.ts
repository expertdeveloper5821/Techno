import axiosInstance from "./axiosInstance";

export interface Industry {
  _id: string;
  title: string;
  icon: string;
  blackIcon: string;
  description: string;
}

export async function getIndustries(): Promise<Industry[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: Industry[] }>("/api/industries");
  if (!data.success) throw new Error("Failed to fetch industries");
  return data.data;
}
