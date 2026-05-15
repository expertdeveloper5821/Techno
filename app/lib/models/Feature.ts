import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeature extends Document {
  title: string;
  description: string;
  image: string;
  order: number;
}

const FeatureSchema = new Schema<IFeature>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Feature: Model<IFeature> =
  mongoose.models.Feature ||
  mongoose.model<IFeature>("Feature", FeatureSchema);

export default Feature;
