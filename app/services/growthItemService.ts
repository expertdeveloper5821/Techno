import axiosInstance from "./axiosInstance";

export interface GrowthItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
  blackIcon: string;
  order: number;
}

export async function getGrowthItems(): Promise<GrowthItem[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: GrowthItem[] }>("/api/growth-items");
  if (!data.success) throw new Error("Failed to fetch growth items");
  return data.data;
}
