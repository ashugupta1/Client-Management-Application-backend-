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
  // Validate request body
  const {
    User,
    Date,
    ProjectName,
    Expenses,
    Ammount,
    MOP,
    ReferenceId,
    File,
    Remark,
  } = req.body;

  if (
    !User ||
    !Date ||
    !ProjectName ||
    !Expenses ||
    !Ammount ||
    !MOP ||
    !ReferenceId
  ) {
    return res.status(400).json({
      message:
        "Missing required fields: User, Date, ProjectName, Expenses, Ammount, MOP, ReferenceId",
    });
  }

  try {
    console.log(req.body);
    const newExpense = new expenseModel({ ...req.body });
    // console.log("Creating new expense:", newExpense);
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
