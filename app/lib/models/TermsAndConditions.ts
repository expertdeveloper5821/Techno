import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITermsAndConditions extends Document {
  title: string;
  paragraphs: string[];
  bullets: string[];
  order: number;
}

const TermsAndConditionsSchema = new Schema<ITermsAndConditions>(
  {
    title: { type: String, required: true, trim: true },
    paragraphs: { type: [String], default: [] },
    bullets: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const TermsAndConditions: Model<ITermsAndConditions> =
  mongoose.models.TermsAndConditions ||
  mongoose.model<ITermsAndConditions>(
    "TermsAndConditions",
    TermsAndConditionsSchema
  );

export default TermsAndConditions;
