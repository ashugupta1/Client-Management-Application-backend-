const express = require("express");
const {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/expense", getAllExpenses);

router.post("/expense", addExpense);

router.put("/expense/:id", updateExpense);

router.delete("/expense/:id", deleteExpense);

module.exports = router;
