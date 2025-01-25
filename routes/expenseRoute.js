const express = require("express");
const upload = require("../middlewares/upload");

const {
  getAllExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const router = express.Router();

router.get("/expense", getAllExpenses);

router.post("/expense", upload.single("File"), addExpense);

router.put("/expense/:id", updateExpense);

router.delete("/expense/:id", deleteExpense);

module.exports = router;
