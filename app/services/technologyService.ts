import axiosInstance from "./axiosInstance";

export interface Technology {
  _id: string;
  name: string;
  logo: string;
  description: string;
  row: number;
}

export async function getTechnologies(row?: number): Promise<Technology[]> {
  const params = row !== undefined ? { row } : {};
  const { data } = await axiosInstance.get<{ success: boolean; data: Technology[] }>("/api/technologies", { params });
  if (!data.success) throw new Error("Failed to fetch technologies");
  return data.data;
}
