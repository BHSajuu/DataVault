import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  isApproved: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);
