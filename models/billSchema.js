const mongoose = required("mongoose");

const billSchama = new Schama({
  billedQuantity: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    default: new Date().getTime(),
  },
  billNumber: {
    type
  }
});

const Bill = mongoose.model("Bill", billSchama);
module.exports = Bill;
