import mongoose, { Schema, Document, Model } from "mongoose";

export interface IIndustry extends Document {
  title: string;
  icon: string;
  blackIcon: string;
  description: string;
  order: number;
}

const IndustrySchema = new Schema<IIndustry>(
  {
    title: { type: String, required: true, trim: true },
    icon: { type: String, required: true },
    blackIcon: { type: String, default: "" },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Industry: Model<IIndustry> =
  mongoose.models.Industry ||
  mongoose.model<IIndustry>("Industry", IndustrySchema);

export default Industry;
