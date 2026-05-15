import mongoose, { Schema, Document, Model } from "mongoose";

export interface IGrowthItem extends Document {
  title: string;
  description: string;
  icon: string;
  blackIcon: string;
  order: number;
}

const GrowthItemSchema = new Schema<IGrowthItem>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    blackIcon: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GrowthItem: Model<IGrowthItem> =
  mongoose.models.GrowthItem ||
  mongoose.model<IGrowthItem>("GrowthItem", GrowthItemSchema);

export default GrowthItem;
