const express = require("express");
const router = express.Router();
const safe = require("../models/safe");
const id = 0;
//get all safes
router.get("/", async (req, res) => {
  try {
    const safes = await safe.find();
    res.json(safes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//get safes with ID
router.get("/:safeId", async (req, res) => {
  try {
    const safes = await safe.find({ _id: req.params.safeId });
    res.status(200).json(safes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//create safes
router.post("/", async (req, res) => {
  const safes = new safe({
    safeName: req.body.name,
    safeOwner: req.body.owner,
    type: req.body.type,
    description: req.body.description,
    secrets: [],
  });
  try {
    const savedSafe = await safes.save();
    res.status(200).json(savedSafe);
  } catch (err) {
    res.status(403).json({ message: err });
  }
});
//Delete Safe
router.delete("/:safeId", async (req, res) => {
  try {
    const deleteSafes = await safe.remove({ _id: req.params.safeId });
    res.status(200).json(deleteSafes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//Upadate Safe
router.patch("/:safeId", async (req, res) => {
  try {
    const updateSafes = await safe.updateOne(
      { _id: req.params.safeId },
      {
        $set: {
          safeName: req.body.name,
          safeOwner: req.body.owner,
          type: req.body.type,
          description: req.body.description,
        },
      }
    );
    res.status(200).json(updateSafes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//create secrets
router.patch("/create-secret/:safeId", async (req, res) => {
  try {
    const updateSafes = await safe.updateOne(
      { _id: req.params.safeId },
      {
        $push: {
          secrets: req.body.secret,
        },
      }
    );
    res.status(200).json(updateSafes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//get secrets
router.get("/get-secrets/:safeId", async (req, res) => {
  try {
    const safes = await safe.findOne({ _id: req.params.safeId });
    res.status(200).json(safes.secrets);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
//delete secrets
router.delete("/delete-secret/:safeId/:value", async (req, res) => {
  try {
    const pullSafes = await safe.updateOne(
      { _id: req.params.safeId },
      { $pull: { secrets: req.params.value } }
    );
    res.status(200).json(pullSafes);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
