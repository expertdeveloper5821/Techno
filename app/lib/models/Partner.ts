import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPartner extends Document {
  name: string;
  logoGray: string;
  logoColor: string;
  order: number;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, trim: true },
    logoGray: { type: String, required: true },
    logoColor: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Partner: Model<IPartner> =
  mongoose.models.Partner || mongoose.model<IPartner>("Partner", PartnerSchema);

export default Partner;
