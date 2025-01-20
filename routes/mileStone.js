const express = require("express");
const mileStone = require("../models/mileStone");
const router = express.Router();

// Create a new milestone
router.post("/milestone", async (req, res) => {
  try {
    const newMilestone = new mileStone(req.body);
    await newMilestone.save();
    res.status(201).json({ message: "Milestone created successfully", milestone: newMilestone });
  } catch (error) {
    console.error("Error creating milestone:", error);
    res.status(500).json({ message: "Error creating milestone", error: error.message });
  }
});

// Get all milestones
router.get("/milestone", async (req, res) => {
  try {
    const milestones = await mileStone.find();
    res.status(200).json({ message: "Milestones fetched successfully", milestones });
  } catch (error) {
    console.error("Error fetching milestones:", error);
    res.status(500).json({ message: "Error fetching milestones", error: error.message });
  }
});

// Get a single milestone by ID
router.get("/milestone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const milestone = await mileStone.findById(id);

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    res.status(200).json({ message: "Milestone fetched successfully", milestone });
  } catch (error) {
    console.error("Error fetching milestone:", error);
    res.status(500).json({ message: "Error fetching milestone", error: error.message });
  }
});

// Get a milestone by orderNumber
router.get("/order/:orderNumber", async (req, res) => {
    try {
      const { orderNumber } = req.params;
  
      // Find milestones matching the provided orderNumber
      const milestones = await mileStone.find({ orderNumber });
  
      if (!milestones || milestones.length === 0) {
        return res.status(404).json({ message: "No milestones found for this order number" });
      }
  
      res.status(200).json({ message: "Milestones fetched successfully", milestones });
    } catch (error) {
      console.error("Error fetching milestones by order number:", error);
      res.status(500).json({ message: "Error fetching milestones", error: error.message });
    }
  });
  

// Update a milestone by ID
router.put("/milestone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMilestone = await mileStone.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    res.status(200).json({ message: "Milestone updated successfully", milestone: updatedMilestone });
  } catch (error) {
    console.error("Error updating milestone:", error);
    res.status(500).json({ message: "Error updating milestone", error: error.message });
  }
});

// Delete a milestone by ID
router.delete("/milestone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMilestone = await mileStone.findByIdAndDelete(id);

    if (!deletedMilestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    res.status(200).json({ message: "Milestone deleted successfully", milestone: deletedMilestone });
  } catch (error) {
    console.error("Error deleting milestone:", error);
    res.status(500).json({ message: "Error deleting milestone", error: error.message });
  }
});

module.exports = router;
