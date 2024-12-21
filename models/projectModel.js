const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String },
  orderNumber: { type: String, unique: true, required: true },
  projectAddress: { type: String, required: true },
  TDS: { type: Number, required: true },
  CGST: { type: Number },
  SGST: { type: Number },
  IGST: { type: Number },
  fileUpload: { type: String },
  billedBy: { type: String },
  billedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: false,
  },
  description: { type: String },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
