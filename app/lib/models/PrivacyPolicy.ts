import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPrivacyPolicy extends Document {
  title: string;
  paragraphs: string[];
  bullets: string[];
  order: number;
}

const PrivacyPolicySchema = new Schema<IPrivacyPolicy>(
  {
    title: { type: String, required: true, trim: true },
    paragraphs: { type: [String], default: [] },
    bullets: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PrivacyPolicy: Model<IPrivacyPolicy> =
  mongoose.models.PrivacyPolicy ||
  mongoose.model<IPrivacyPolicy>("PrivacyPolicy", PrivacyPolicySchema);

export default PrivacyPolicy;
