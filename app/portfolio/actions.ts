'use server';

import { connectDB } from '@/app/lib/db';
import PortfolioWorkModel from '@/app/lib/models/PortfolioWork';

export interface PortfolioItemData {
  _id: string;
  title: string;
  tag: string;
  category: string;
  description: string;
  image: string;
}

export interface FetchPortfolioResult {
  items: PortfolioItemData[];
  total: number;
  totalPages: number;
}

export async function fetchPortfolioItems(params: {
  page?: number;
  limit?: number;
  category?: string;
}): Promise<FetchPortfolioResult> {
  const { page = 1, limit = 9, category } = params;

  await connectDB();

  const filter: Record<string, unknown> = {};
  if (category && category !== 'All') {
    filter.category = category;
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    PortfolioWorkModel.find(filter).sort({ order: 1 }).skip(skip).limit(limit).lean(),
    PortfolioWorkModel.countDocuments(filter),
  ]);

  return JSON.parse(JSON.stringify({
    items,
    total,
    totalPages: Math.ceil(total / limit),
  }));
}
