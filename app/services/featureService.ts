import axiosInstance from "./axiosInstance";

export interface Feature {
  _id: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

export async function getFeatures(): Promise<Feature[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: Feature[] }>("/api/features");
  if (!data.success) throw new Error("Failed to fetch features");
  return data.data;
}
