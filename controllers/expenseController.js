const expenseModel = require("../models/expenseModel");

// Get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find();
    res.status(200).json(expenses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in getting expenses", error: error.message });
  }
};

// Add expense
const addExpense = async (req, res) => {
  try {
    const {
      User,
      Date,
      ProjectName,
      Expenses,
      Ammount,
      MOP,
      ReferenceId,
      Remark,
    } = req.body;

    console.log("req.body ", req.body);
    console.log("req.file ", req.body.File);

    // Check for required fields
    if (!User || !Date || !ProjectName || !Expenses || !Ammount || !MOP) {
      return res.status(400).json({
        message:
          "Missing required fields: User, Date, ProjectName, Expenses, Ammount, MOP",
      });
    }

    // File upload details
    const fileDetails = req.File
      ? {
          fileName: req.file.originalname,
          fileType: req.file.mimetype,
          filePath: req.file.path,
        }
      : null;

    console.log(req.file);

    const newExpense = new expenseModel({
      User,
      Date,
      ProjectName,
      Expenses,
      Ammount,
      MOP,
      ReferenceId,
      Remark,
      File: fileDetails,
    });

    await newExpense.save();
    res.status(201).json({
      message: "Expense created successfully",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({
      message: "Error creating expense",
      error: error.message,
    });
  }
};

// Update expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await expenseModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Expense updated successfully",
      expense: updatedExpense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in updating expense", error: error.message });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await expenseModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Expense deleted successfully",
      expense: deletedExpense,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in deleting expense", error: error.message });
  }
};

// Export the functions
module.exports = {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};
