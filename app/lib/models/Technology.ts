import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITechnology extends Document {
  name: string;
  logo: string;
  description: string;
  row: number; // 1 or 2 — which marquee row it belongs to
  order: number;
}

const TechnologySchema = new Schema<ITechnology>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    row: { type: Number, required: true, enum: [1, 2] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Technology: Model<ITechnology> =
  mongoose.models.Technology ||
  mongoose.model<ITechnology>("Technology", TechnologySchema);

export default Technology;
