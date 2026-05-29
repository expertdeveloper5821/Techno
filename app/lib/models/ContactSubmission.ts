import mongoose, { Schema, Document, Model } from "mongoose";

export type ContactStatus = "new" | "read" | "replied" | "archived";

export interface IContactSubmission extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  agreePrivacy: boolean;
  status: ContactStatus;
  ipAddress?: string;
  userAgent?: string;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    firstName:    { type: String, required: true, trim: true },
    lastName:     { type: String, required: true, trim: true },
    email:        { type: String, required: true, trim: true, lowercase: true },
    phone:        { type: String, default: "" },
    message:      { type: String, required: true },
    agreePrivacy: { type: Boolean, required: true },
    status:       { type: String, enum: ["new", "read", "replied", "archived"], default: "new" },
    ipAddress:    { type: String, default: "" },
    userAgent:    { type: String, default: "" },
  },
  { timestamps: true }
);

// Index for fast admin queries
ContactSubmissionSchema.index({ status: 1, createdAt: -1 });

const ContactSubmission: Model<IContactSubmission> =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);

export default ContactSubmission;
