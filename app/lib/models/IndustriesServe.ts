import mongoose, { Schema, Document, Model } from "mongoose";

export interface IIndustriesServe extends Document {
  heading: string;
  paragraphs: string;
  highlightText: string;
  feature1: string;
  feature2: string;
  feature3: string;
  image: string;
  order: number;
}

const IndustriesServeSchema = new Schema<IIndustriesServe>(
  {
    heading: { type: String, required: true, trim: true },
    paragraphs: { type: String, required: true },
    highlightText: { type: String, required: true },
    feature1: { type: String, required: true },
    feature2: { type: String, default: "" },
    feature3: { type: String, default: "" },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Delete cached model so schema changes are picked up on hot-reload
delete (mongoose.models as Record<string, unknown>).IndustriesServe;

const IndustriesServe: Model<IIndustriesServe> =
  mongoose.model<IIndustriesServe>("IndustriesServe", IndustriesServeSchema);

export default IndustriesServe;
