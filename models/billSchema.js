const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  date: { type: String, required: true },
  billNumber: { type: String, required: true, unique: true },
  billedTo: { type: String, required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: false },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  total: { type: Number },
  billedQuantity: { type: Number, required: true },
  sgst: { type: Number, required: false },
  cgst: { type: Number, required: false },
  igst: { type: Number, required: false },
  tds: { type: Number, required: true },
  totalTax: { type: Number, required: true },
  balanceAfterTax: { type: Number, required: true },
  totalTax: { type: Number, required: true },
  balanceBeforeTax: { type: Number, required: true },
});

module.exports = mongoose.model("Bill", billSchema);
