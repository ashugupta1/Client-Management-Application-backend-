const express = require("express");
const Bill = require("../models/billSchema");

const router = express.Router();

// Add a new bill
router.post("/", async (req, res) => {
  try {
    // Extract and validate input values from request body
    console.log("post req");
    const { billedQuantity, quantity, rate, tds, cgst, sgst, igst, total } =
      req.body;

    const billedQuantityinNum = Number(billedQuantity);

    // console.log(quantity);
    // console.log(rate);
    // console.log(tds);
    // console.log(cgst);
    // console.log(sgst);
    // console.log(igst);

    const totalAmount = rate * billedQuantityinNum;
    const tdsInRupees = (totalAmount * tds) / 100;
    const totalTax =
      (totalAmount * sgst) / 100 +
      (totalAmount * cgst) / 100 +
      (totalAmount * igst) / 100;
    const balanceBeforeTax = totalAmount - tdsInRupees;
    const balanceAfterTax = totalAmount + totalTax;
    // const Total = (quantity - billedQuantity) * rate;

    // console.log("quntity " + quantity);

    // console.log(
    //   `Total Amount: ${totalAmount}, Total Tax: ${totalTax}, TDS in Rupees: ${tdsInRupees}, Balance Before Tax: ${balanceBeforeTax}, Balance After Tax: ${balanceAfterTax}`
    // );

    if (!quantity || !rate) {
      return res
        .status(400)
        .json({ message: "Quantity and rate are required." });
    }

    // console.log("Request Body:", req.body);
    // console.log("Calculated Values:", {
    //   totalAmount,
    //   tds: tdsInRupees,
    //   totalTax,
    //   balanceBeforeTax,
    //   balanceAfterTax,
    // });

    const newBill = new Bill({
      ...req.body, // Spread the original input fields
      totalAmount,
      tds: tdsInRupees,
      totalTax,
      balanceBeforeTax,
      balanceAfterTax,
      // total: Total,
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
  console.log("put req");
  console.log(req.body);
  const { billedQuantity, quantity, rate, tds, cgst, sgst, igst } = req.body;

  const billedQuantityinNum = Number(billedQuantity);

  // console.log(quantity);
  // console.log(rate);
  // console.log(tds);
  // console.log(cgst);
  // console.log(sgst);
  // console.log(igst);

  const totalAmount = rate * billedQuantityinNum;
  const tdsInRupees = (totalAmount * tds) / 100;
  const totalTax =
    (totalAmount * sgst) / 100 +
    (totalAmount * cgst) / 100 +
    (totalAmount * igst) / 100;
  const balanceBeforeTax = totalAmount - tdsInRupees;
  const balanceAfterTax = totalAmount + totalTax;

  // console.log("quntity " + quantity);

  console.log(
    `Total Amount: ${totalAmount}, Total Tax: ${totalTax}, TDS in Rupees: ${tdsInRupees}, Balance Before Tax: ${balanceBeforeTax}, Balance After Tax: ${balanceAfterTax}`
  );

  if (!quantity || !rate) {
    return res.status(400).json({ message: "Quantity and rate are required." });
  }

  try {
    const updatedBill = await Bill.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        totalAmount,
        tdsInRupees,
        totalTax,
        balanceBeforeTax,
        balanceAfterTax,
      },
      { new: true } // Return the updated document
    );
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
