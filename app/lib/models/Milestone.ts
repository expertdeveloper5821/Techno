import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMilestone extends Document {
  image: string;
  order: number;
}

const MilestoneSchema = new Schema<IMilestone>(
  {
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Milestone: Model<IMilestone> =
  mongoose.models.Milestone ||
  mongoose.model<IMilestone>("Milestone", MilestoneSchema);

export default Milestone;
