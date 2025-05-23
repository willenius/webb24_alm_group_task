const Accomodation = require("../models/Accomodation")

const router = require("express").Router();

// Create a new Accomodation
router.post("/", async (req, res) => {
  try {
    const accomodation = await Accomodation.create(req.body);
    res.status(201).json(accomodation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Accomodation
router.get("/", async (req, res) => {
  try {
    const accomodations = await Accomodation.findAll();
    res.json(accomodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Accomodation by ID
router.get("/:id", async (req, res) => {
  try {
    const accomodation = await Accomodation.findByPk(req.params.id);
    if (accomodation) {
      res.json(accomodation);
    } else {
      res.status(404).json({ message: "Accomodation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a 
router.put("/:id", async (req, res) => {
  try {
    const accomodation = await Accomodation.findByPk(req.params.id);
    if (accomodation) {
      await accomodation.update(req.body);
      res.json(accomodation);
    } else {
      res.status(404).json({ message: "Accomodation not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Accomodation
router.delete("/:id", async (req, res) => {
  try {
    const accomodation = await Accomodation.findByPk(req.params.id);
    if (accomodation) {
      await accomodation.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Accomodation not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
