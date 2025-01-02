const express = require("express");
const Bill = require("../models/billSchema");

const router = express.Router();

// Add a new bill
router.post("/", async (req, res) => {
  try {
    // Extract and validate input values from request body
    console.log(req.body);
    const { billedQuantity, rate, TDS, CGST, SGST, IGST } = req.body;

    const quantity = Number(billedQuantity);

    console.log(quantity);

    console.log({ quantity, rate, TDS, CGST, SGST, IGST });

    if (!quantity || !rate) {
      return res
        .status(400)
        .json({ message: "Quantity and rate are required." });
    }

    // Ensure numeric values for calculations
    const qty = parseFloat(quantity) || 0;
    const rt = parseFloat(rate) || 0;
    const tds = parseFloat(TDS) || 0;
    const cgst = parseFloat(CGST) || 0;
    const sgst = parseFloat(SGST) || 0;
    const igst = parseFloat(IGST) || 0;

    // Perform calculations
    const totalAmount = qty * rt; // Calculate total amount
    const tdsInRupees = (totalAmount * tds) / 100; // Calculate TDS in rupees
    const totalTax =
      (totalAmount * cgst) / 100 +
      (totalAmount * sgst) / 100 +
      (totalAmount * igst) / 100; // Calculate total tax
    const balanceBeforeTax = totalAmount - tdsInRupees; // Balance before tax
    const balanceAfterTax = balanceBeforeTax + totalTax; // Balance after tax

    // Construct new bill object with calculated values
    const newBill = new Bill({
      ...req.body, // Spread the original input fields
      totalAmount,
      tdsInRupees,
      totalTax,
      balanceBeforeTax,
      balanceAfterTax,
    });

    // Save to the database
    await newBill.save();
    res
      .status(201)
      .json({ message: "Bill created successfully", bill: newBill });
  } catch (error) {
    console.error("Error creating bill:", error);
    res
      .status(500)
      .json({ message: "Error creating bill", error: error.message });
  }
});

// Get all bills
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res
      .status(500)
      .json({ message: "Error fetching bills", error: error.message });
  }
});

// Update a bill by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res
      .status(200)
      .json({ message: "Bill updated successfully", bill: updatedBill });
  } catch (error) {
    console.error("Error updating bill:", error);
    res
      .status(500)
      .json({ message: "Error updating bill", error: error.message });
  }
});

// Delete a bill by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res
      .status(200)
      .json({ message: "Bill deleted successfully", bill: deletedBill });
  } catch (error) {
    console.error("Error deleting bill:", error);
    res
      .status(500)
      .json({ message: "Error deleting bill", error: error.message });
  }
});

module.exports = router;
