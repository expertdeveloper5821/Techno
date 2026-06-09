import { notFound } from "next/navigation";
import { connectDB } from "@/app/lib/db";
import BlogPostModel from "@/app/lib/models/BlogPost";
import BlogDetailHero from "@/app/components/blog-detail/hero";
import BlogDetailContent from "@/app/components/blog-detail/blogs";
import RelatedBlogs from "@/app/components/blog-detail/related";

export const revalidate = 86400;

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    await connectDB();
    const post = await BlogPostModel.findById(id).lean();
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPost(id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogDetailHero
        title={post.title}
        category={post.category}
        date={post.date}
      />
      <BlogDetailContent
        title={post.title}
        excerpt={post.excerpt}
        image={post.image}
        author={post.author}
        date={post.date}
        category={post.category}
      />
      <RelatedBlogs currentPostId={post._id} />
    </>
  );
}
