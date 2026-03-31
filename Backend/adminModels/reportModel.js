import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    patientName: String,
    description: String,
    category: String,
    images: [String],
    pdf: String,
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);