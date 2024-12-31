const express = require("express");
const Bill = require("../models/billSchema");

const router = express.Router();

// Add a new bill
router.post("/", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json({ message: "Bill created successfully", bill: newBill });
  } catch (error) {
    res.status(400).json({ message: "Error creating bill", error: error.message });
  }
});

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bills", error: error.message });
  }
});

// Update a bill by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json({ message: "Bill updated successfully", bill: updatedBill });
  } catch (error) {
    res.status(400).json({ message: "Error updating bill", error: error.message });
  }
});

// Delete a bill by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json({ message: "Bill deleted successfully", bill: deletedBill });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bill", error: error.message });
  }
});

module.exports = router;
