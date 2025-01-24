const mongoose = require("mongoose");

const clearBillSchema = new mongoose.Schema({
  date: { type: String, required: true },
  billNumber: {type: String, required: true},
  orderNumber: { type: String, required: true },
  SelectTax: { type: String, required: true },
  PandingAmount: { type: Number, required: true },
  PaidAmount: { type: Number, required: true },
  PaymentMode: { type: String, default: "Not Specified" },
  ReferenceNumber: { type: String, required: true },
  UploadFile: { type: String, default: null },
});

module.exports = mongoose.model("ClearBill", clearBillSchema);
