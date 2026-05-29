import mongoose, { Schema, Document, Model } from "mongoose";

export type BlogPostCategory =
  | "Technology"
  | "Marketing"
  | "Business"
  | "Case Studies"
  | "AI Solutions"
  | "E-Commerce";

export interface IBlogPost extends Document {
  title: string;
  excerpt: string;
  category: BlogPostCategory;
  author: string;
  date: string;
  image: string;
  order: number;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Marketing",
        "Business",
        "Case Studies",
        "AI Solutions",
        "E-Commerce",
      ],
    },
    author: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
