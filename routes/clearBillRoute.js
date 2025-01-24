const express = require("express");
const router = express.Router();
const clearBillModel = require("../models/clearBillModel");
const mileStone = require("../models/mileStone");

// Create a new clearBill
router.post("/", async (req, res) => {
  try {
    const { billNumber, SelectTax, PaidAmount } = req.body;

    // Find the milestone associated with the billNumber
    const findMileStone = await mileStone.findOne({ billNumber });
    // console.log(findMileStone);
    if (!findMileStone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // Subtract PaidAmount from the relevant tax field
    switch (SelectTax) {
      case "CGST":
        if (findMileStone.cgst < PaidAmount) {
          return res
            .status(400)
            .json({ message: "Paid amount exceeds CGST balance" });
        }
        findMileStone.cgst = findMileStone.cgst - PaidAmount;
        break;
      case "SGST":
        if ((findMileStone.sgst || 0) < PaidAmount) {
          return res
            .status(400)
            .json({ message: "Paid amount exceeds SGST balance" });
        }
        findMileStone.sgst = (findMileStone.sgst || 0) - PaidAmount;
        break;
      case "IGST":
        if ((findMileStone.igst || 0) < PaidAmount) {
          return res
            .status(400)
            .json({ message: "Paid amount exceeds IGST balance" });
        }
        findMileStone.igst = (findMileStone.igst || 0) - PaidAmount;
        break;
      case "TDS":
        if ((findMileStone.tds || 0) < PaidAmount) {
          return res
            .status(400)
            .json({ message: "Paid amount exceeds TDS balance" });
        }
        findMileStone.tds = (findMileStone.tds || 0) - PaidAmount;
        break;
      case "balanceBeforeTax":
        if ((findMileStone.balanceBeforeTax || 0) < PaidAmount) {
          return res
            .status(400)
            .json({ message: "Paid amount exceeds Balance Before Tax" });
        }
        findMileStone.balanceBeforeTax =
          (findMileStone.balanceBeforeTax || 0) - PaidAmount;
        break;
      default:
        return res.status(400).json({ message: "Invalid tax type" });
    }

    // Save the updated milestone
    await findMileStone.save();

    // Create a new ClearBill entry
    const newClearBill = new clearBillModel({ ...req.body });
    await newClearBill.save();

    res.status(201).json({
      message: "ClearBill created successfully and milestone updated",
      clearBill: newClearBill,
    });
  } catch (error) {
    console.error("Error creating ClearBill:", error);
    res.status(500).json({
      message: "An error occurred while creating ClearBill",
      error: error.message,
    });
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
