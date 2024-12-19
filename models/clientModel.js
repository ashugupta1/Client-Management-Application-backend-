const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  GSTIN: {
    type: String,
    required: true,
    unique: true,
  },
});

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;
