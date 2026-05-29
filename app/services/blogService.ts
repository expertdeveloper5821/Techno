import axiosInstance from "./axiosInstance";

export interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

export interface BlogPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogPostsResponse {
  posts: BlogPost[];
  pagination: BlogPagination;
}

export async function getBlogPosts(params: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<BlogPostsResponse> {
  const query: Record<string, string> = {
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 6),
  };
  if (params.category && params.category !== "All") {
    query.category = params.category;
  }

  const { data } = await axiosInstance.get<{
    success: boolean;
    data: BlogPost[];
    pagination: BlogPagination;
  }>("/api/blog-posts", { params: query });

  if (!data.success) throw new Error("Failed to fetch blog posts");
  return { posts: data.data, pagination: data.pagination };
}
