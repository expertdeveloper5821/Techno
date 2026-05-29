import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobOpening extends Document {
  title: string;
  experience: string;
  type: string;
  location: string;
  description: string;
  order: number;
}

const JobOpeningSchema = new Schema<IJobOpening>(
  {
    title: { type: String, required: true, trim: true },
    experience: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const JobOpening: Model<IJobOpening> =
  mongoose.models.JobOpening ||
  mongoose.model<IJobOpening>("JobOpening", JobOpeningSchema);

export default JobOpening;
