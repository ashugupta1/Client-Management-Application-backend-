const express = require("express");
const router = express.Router();
const clearBillModel = require("../models/clearBillModel");
const Bill = require("../models/billSchema");

// Create a new clearBill
router.post("/", async (req, res) => {
  try {
    // const { orderNumber, PaidAmount, SelectTax } = req.body;

    // // Validate input
    // if (!orderNumber) {
    //   return res.status(400).json({ message: "Order number is required" });
    // }
    // if (!PaidAmount || isNaN(PaidAmount)) {
    //   return res.status(400).json({ message: "Valid PaidAmount is required" });
    // }
    // if (!SelectTax) {
    //   return res.status(400).json({ message: "SelectTax is required" });
    // }

    // // console.log("Request Body:", typeof req.body.PaidAmount);
    // console.log("Request Body:", req.body);

    // // Find the bill
    // const updatedBill = await Bill.findOne({ orderNumber });
    // if (!updatedBill) {
    //   return res.status(404).json({ message: "Bill not found" });
    // }
    // console.log("Bill Data:", updatedBill);

    // // Convert PaidAmount to a number
    // const paidAmount = parseFloat(PaidAmount);

    // // Update the corresponding tax field
    // switch (SelectTax) {
    //   case "SGST":
    //     updatedBill.sgst = (updatedBill.sgst || 0) - paidAmount;
    //     console.log("sgst");
    //     break;
    //   case "CGST":
    //     updatedBill.cgst = (updatedBill.cgst || 0) - paidAmount;
    //     console.log("cgdt");
    //     break;
    //   case "IGST":
    //     updatedBill.igst = (updatedBill.igst || 0) - paidAmount;
    //     console.log("igst");
    //     break;
    //   case "TDS":
    //     updatedBill.tds = (updatedBill.tds || 0) - paidAmount;
    //     console.log("tds");
    //     break;
    //   case "balanceBeforeTax":
    //     updatedBill.balanceBeforeTax =
    //       (updatedBill.balanceBeforeTax || 0) - paidAmount;
    //     console.log("bbt");
    //     break;
    //   default:
    //     return res.status(400).json({ message: "Invalid SelectTax value" });
    // }

    // // Save the updated bill
    // await updatedBill.save();

    // Create a new ClearBill entry
    const newClearBill = new clearBillModel({
      ...req.body,
    });
    await newClearBill.save();

    res.status(201).json({
      message: "ClearBill created successfully",
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
