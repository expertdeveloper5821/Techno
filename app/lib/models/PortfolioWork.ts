import mongoose, { Schema, Document, Model } from "mongoose";

export type PortfolioCategory =
  | "Consulting"
  | "Mobile Apps"
  | "Web Development"
  | "Cloud & DevOps"
  | "AI Solutions"
  | "E-Commerce";

export interface IPortfolioWork extends Document {
  title: string;
  tag: string;
  category: PortfolioCategory;
  description: string;
  image: string;
  order: number;
}

const PortfolioWorkSchema = new Schema<IPortfolioWork>(
  {
    title: { type: String, required: true, trim: true },
    tag: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Consulting",
        "Mobile Apps",
        "Web Development",
        "Cloud & DevOps",
        "AI Solutions",
        "E-Commerce",
      ],
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PortfolioWork: Model<IPortfolioWork> =
  mongoose.models.PortfolioWork ||
  mongoose.model<IPortfolioWork>("PortfolioWork", PortfolioWorkSchema);

export default PortfolioWork;
