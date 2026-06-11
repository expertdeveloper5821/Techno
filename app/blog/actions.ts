'use server';

import { connectDB } from '@/app/lib/db';
import BlogPostModel from '@/app/lib/models/BlogPost';

export interface BlogPostData {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

export interface FetchBlogPostsResult {
  posts: BlogPostData[];
  total: number;
  totalPages: number;
}

export async function fetchBlogPosts(params: {
  page?: number;
  limit?: number;
  category?: string;
  query?: string;
}): Promise<FetchBlogPostsResult> {
  const { page = 1, limit = 6, category, query } = params;

  await connectDB();

  // Build filter
  const filter: Record<string, unknown> = {};
  if (category && category !== 'All') {
    filter.category = category;
  }
  if (query && query.trim()) {
    const q = query.trim();
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { excerpt: { $regex: q, $options: 'i' } },
      { author: { $regex: q, $options: 'i' } },
      { category: { $regex: q, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    BlogPostModel.find(filter).sort({ order: 1 }).skip(skip).limit(limit).lean(),
    BlogPostModel.countDocuments(filter),
  ]);

  return JSON.parse(JSON.stringify({
    posts,
    total,
    totalPages: Math.ceil(total / limit),
  }));
}
