import mongoose, { Schema, Document, Model } from "mongoose";

/**
 * ServiceSlide — powers the coverflow ServiceSlider component.
 * Kept separate from the Service model (which drives ServicesCarousel)
 * so each slider can be managed independently in the CMS.
 */
export interface IServiceSlide extends Document {
  title: string;
  image: string;
  description: string;
  order: number;
}

const ServiceSlideSchema = new Schema<IServiceSlide>(
  {
    title:       { type: String, required: true, trim: true },
    image:       { type: String, required: true },
    description: { type: String, default: "" },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ServiceSlide: Model<IServiceSlide> =
  mongoose.models.ServiceSlide ||
  mongoose.model<IServiceSlide>("ServiceSlide", ServiceSlideSchema);

export default ServiceSlide;
