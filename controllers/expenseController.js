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
    const newExpense = new expenseModel({ ...req.body });
    await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense created successfully", expense: newExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating expense", error: error.message });
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
