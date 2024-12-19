const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    projectAddress: {
      type: String,
      required: true,
    },
    TDS: {
      type: Number,
      required: true,
    },
    CGST: {
      type: Number,
      required: true,
    },
    SGST: {
      type: Number,
      required: true,
    },
    IGST: {
      type: Number,
      required: true,
    },
    fileUpload: {
      type: File,
      required: true,
    },
    billedBy: {
      type: String,
      required: true,
    },
    billedTo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
});
  
const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;