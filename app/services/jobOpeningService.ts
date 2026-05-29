import axiosInstance from "./axiosInstance";

export interface JobOpening {
  _id: string;
  title: string;
  experience: string;
  type: string;
  location: string;
  description: string;
  order: number;
}

export async function getJobOpenings(): Promise<JobOpening[]> {
  const { data } = await axiosInstance.get<{ success: boolean; data: JobOpening[] }>("/api/job-openings");
  if (!data.success) throw new Error("Failed to fetch job openings");
  return data.data;
}
