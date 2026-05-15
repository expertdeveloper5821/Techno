import mongoose, { Schema, Document, Model } from "mongoose";

export interface IServiceBullet {
  label: string;
}

export interface IServiceColumn {
  items: IServiceBullet[];
}

export interface IWhatWeDo extends Document {
  imageSrc: string;
  imageAlt: string;
  icon: string;
  title: string;
  description: string;
  servicesColumns: IServiceColumn[];
  buttonLabel: string;
  order: number;
}

const ServiceBulletSchema = new Schema<IServiceBullet>(
  { label: { type: String, required: true } },
  { _id: false }
);

const ServiceColumnSchema = new Schema<IServiceColumn>(
  { items: { type: [ServiceBulletSchema], default: [] } },
  { _id: false }
);

const WhatWeDoSchema = new Schema<IWhatWeDo>(
  {
    imageSrc: { type: String, required: true },
    imageAlt: { type: String, default: "" },
    icon: { type: String, default: "" },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    servicesColumns: { type: [ServiceColumnSchema], default: [] },
    buttonLabel: { type: String, default: "Talk to us" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const WhatWeDo: Model<IWhatWeDo> =
  mongoose.models.WhatWeDo ||
  mongoose.model<IWhatWeDo>("WhatWeDo", WhatWeDoSchema);

export default WhatWeDo;
