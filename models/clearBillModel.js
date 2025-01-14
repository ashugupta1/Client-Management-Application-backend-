const mongoose = require("mongoose");

const clearBillSchema = new mongoose.Schema({
  date: { type: String, required: true },
  selectTax: { type: String, required: true },
  pendingAmount: { type: Number, required: true },
  paidAmount: { type: Number, required: true },
  paymentMode: { type: String, default: "Not Specified" },
  referenceNumber: { type: String, required: true },
  uploadFile: { type: String, default: null },
  billNumber: { type: String, required: true },
});

module.exports = mongoose.model("ClearBill", clearBillSchema);
