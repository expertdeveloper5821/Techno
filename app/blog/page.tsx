import { connectDB } from '@/app/lib/db';
import BlogPostModel from '@/app/lib/models/BlogPost';

import Hero from '../components/blog-com/hero/Hero';
import BlogListing from '../components/blog-com/listing/BlogListing';
import Thought from '../components/industries-com/Thought/Thought';

export const revalidate = 86400;

const ITEMS_PER_PAGE = 6;

async function getBlogPageData() {
  await connectDB();

  const [posts, total] = await Promise.all([
    BlogPostModel.find({}).sort({ order: 1 }).skip(0).limit(ITEMS_PER_PAGE).lean(),
    BlogPostModel.countDocuments({}),
  ]);

  return JSON.parse(JSON.stringify({
    posts,
    total,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
  }));
}

export default async function BlogPage() {
  const { posts, total, totalPages } = await getBlogPageData();

  return (
    <>
      <Hero />
      <BlogListing initialPosts={posts} initialTotal={total} initialTotalPages={totalPages} />
      <Thought />
    </>
  );
}
