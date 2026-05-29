import axiosInstance from "./axiosInstance";

export interface Service {
  _id: string;
  title: string;
  image: string;
  description: string;
}

export async function getServices(): Promise<Service[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: Service[] }>("/api/services");
  if (!data.success) throw new Error("Failed to fetch services");
  return data.data;
}
