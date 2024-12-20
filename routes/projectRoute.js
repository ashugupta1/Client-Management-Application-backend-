const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");

// Add a new project
router.post("/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    // console.log(project);

    await project.save();
    res.status(201).json({ message: "Project added successfully", project });
  } catch (error) {
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
router.put("/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validations are run
    });

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
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
