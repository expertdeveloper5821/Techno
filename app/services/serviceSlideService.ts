import axiosInstance from "./axiosInstance";

export interface ServiceSlide {
  _id: string;
  title: string;
  image: string;
  description: string;
  order: number;
}

export async function getServiceSlides(): Promise<ServiceSlide[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: ServiceSlide[] }>(
    "/api/service-slides"
  );
  if (!data.success) throw new Error("Failed to fetch service slides");
  return data.data;
}
