const express = require("express");
const router = express.Router();
const clearBillModel = require("../models/clearBillModel");
const Bill = require('../models/billSchema');

// Create a new clearBill
router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    
    const newClearBill = new clearBillModel({ ...req.body });
    await newClearBill.save();
    res.status(201).json({
      message: "ClearBill created successfully",
      clearBill: newClearBill,
    });
  } catch (error) {
    console.error("Error creating ClearBill:", error);
    res
      .status(500)
      .json({ message: "Error creating bill", error: error.message });
  }
});

// Get all clearBills
router.get("/", async (req, res) => {
  try {
    const clearBills = await clearBillModel.find();
    res.status(200).json(clearBills);
  } catch (error) {
    console.error("Error fetching ClearBills:", error);
    res
      .status(500)
      .json({ message: "Error fetching bills", error: error.message });
  }
});

// Get a single clearBill by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const clearBill = await clearBillModel.findById(id);
    if (!clearBill) {
      return res.status(404).json({ message: "ClearBill not found" });
    }
    res.status(200).json(clearBill);
  } catch (error) {
    console.error("Error fetching ClearBill:", error);
    res
      .status(500)
      .json({ message: "Error fetching bill", error: error.message });
  }
});

// Update a clearBill by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClearBill = await clearBillModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation rules are applied
      }
    );
    if (!updatedClearBill) {
      return res.status(404).json({ message: "ClearBill not found" });
    }
    res.status(200).json({
      message: "ClearBill updated successfully",
      clearBill: updatedClearBill,
    });
  } catch (error) {
    console.error("Error updating ClearBill:", error);
    res
      .status(500)
      .json({ message: "Error updating bill", error: error.message });
  }
});

// Delete a clearBill by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClearBill = await clearBillModel.findByIdAndDelete(id);
    if (!deletedClearBill) {
      return res.status(404).json({ message: "ClearBill not found" });
    }
    res.status(200).json({
      message: "ClearBill deleted successfully",
      clearBill: deletedClearBill,
    });
  } catch (error) {
    console.error("Error deleting ClearBill:", error);
    res
      .status(500)
      .json({ message: "Error deleting bill", error: error.message });
  }
});

module.exports = router;
