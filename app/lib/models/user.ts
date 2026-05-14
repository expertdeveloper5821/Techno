import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

// prevent model overwrite in Next.js
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;