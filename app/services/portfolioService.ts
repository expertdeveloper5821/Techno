import axiosInstance from "./axiosInstance";

export interface PortfolioItem {
  _id: string;
  title: string;
  tag: string;
  category: string;
  description: string;
  image: string;
}

export interface PortfolioPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PortfolioResponse {
  items: PortfolioItem[];
  pagination: PortfolioPagination;
}

export async function getPortfolioItems(params: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<PortfolioResponse> {
  const query: Record<string, string> = {
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 9),
  };
  if (params.category && params.category !== "All") {
    query.category = params.category;
  }

  const { data } = await axiosInstance.get<{
    success: boolean;
    data: PortfolioItem[];
    pagination: PortfolioPagination;
  }>("/api/portfolio", { params: query });

  if (!data.success) throw new Error("Failed to fetch portfolio items");
  return { items: data.data, pagination: data.pagination };
}
