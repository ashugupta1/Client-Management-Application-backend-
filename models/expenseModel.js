const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true,
    trim: true,
  },

  Date: {
    type: String,
    required: true,
    trim: true,
  },

  ProjectName: {
    type: String,
    required: true,
    trim: true,
  },

  Expenses: {
    type: String,
    required: true,
    trim: true,
  },

  Ammount: {
    type: Number,
    required: true,
  },

  MOP: {
    type: String,
    required: true,
    trim: true,
  },

  ReferenceId: {
    type: String,
    // required : true,
    trim: true,
  },

  File: {
    type: String,
    // required : true,
    trim: true,
  },

  Remark: {
    type: String,
    // required : true,
    trim: true,
  },

  Rows: [
    {
      Employee: {
        type: String,
        required: true,
        trim: true,
      },
      Reason: {
        type: String,
        required: true,
        trim: true,
      },
      Amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
