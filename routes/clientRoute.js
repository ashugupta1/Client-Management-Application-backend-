const express = require("express");
const router = express.Router();
const Client = require("../models/clientModel");

// Add a new client
router.post("/clients", async (req, res) => {
  console.log("Received Data:", req.body); // Debugging line
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).send(client);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Get all clients
router.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch clients", error: error.message });
  }
});

module.exports = router;
