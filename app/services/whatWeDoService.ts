import axiosInstance from "./axiosInstance";

export interface ServiceBullet {
  label: string;
}

export interface ServiceColumn {
  items: ServiceBullet[];
}

export interface WhatWeDoCard {
  _id: string;
  imageSrc: string;
  imageAlt: string;
  icon: string;
  title: string;
  description: string;
  servicesColumns: ServiceColumn[];
  buttonLabel: string;
  order: number;
}

export async function getWhatWeDo(): Promise<WhatWeDoCard[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: WhatWeDoCard[] }>("/api/what-we-do");
  if (!data.success) throw new Error("Failed to fetch what-we-do data");
  return data.data;
}
