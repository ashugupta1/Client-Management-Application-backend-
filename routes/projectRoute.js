const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { v4: uuidv4 } = require("uuid"); // Using UUID for random unique string

// Function to generate a unique order number
function generateOrderNumber() {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0]; // Get date in YYYY-MM-DD format

  // Generate a random 4-digit number (or use an auto-increment approach if preferred)
  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  // Combine to form the order number
  return `ORD-${formattedDate}-${randomNumber}`;
}

router.post("/projects", async (req, res) => {
  try {
    const orderNumber = generateOrderNumber();
    // console.log("Request Body:", req.body);

    // const project = new Project(req.body);
    // console.log("New Project:", project);
    const project = new Project({
      orderNumber: orderNumber,
      ...req.body, // other project data
    });

    await project.save();
    res.status(201).json({ message: "Project added successfully", project });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        field: error.keyPattern,
        value: error.keyValue,
      });
    }
    console.error("Error adding project:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().populate("billedTo");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a project
const mongoose = require("mongoose");

router.put("/projects/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Project ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID" });
    }

    const updatedData = req.body;
    console.log("Updated Data:", updatedData);

    if (req.file) {
      console.log("Uploaded File:", req.file);
      updatedData.filePath = req.file.path;
    }

    // Ensure orderNumber is unique (if it's being updated)
    if (updatedData.orderNumber) {
      const existingProject = await Project.findOne({
        orderNumber: updatedData.orderNumber,
      });
      if (existingProject && existingProject._id.toString() !== id) {
        return res.status(400).json({
          message: `orderNumber ${updatedData.orderNumber} already exists`,
        });
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // console.log("Updated Project:", updatedProject);
    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        field: error.keyPattern,
        value: error.keyValue,
      });
    }
    console.error("Error during project update:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a project
router.delete("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
