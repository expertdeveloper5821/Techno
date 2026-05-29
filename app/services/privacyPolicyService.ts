import axiosInstance from "./axiosInstance";

export interface PrivacyPolicyTopic {
  _id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
  order: number;
}

export async function getPrivacyPolicy(): Promise<PrivacyPolicyTopic[]> {
  const { data } = await axiosInstance.get<{
    success: boolean;
    data: PrivacyPolicyTopic[];
  }>("/api/privacy-policy");
  if (!data.success) throw new Error("Failed to fetch privacy policy");
  return data.data;
}
