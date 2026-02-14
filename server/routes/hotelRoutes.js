const express = require("express");
const router = express.Router();
const hotelModel = require("../model/hotelModel");

router.get("/getallrooms", async (req, res) => {
  try {
    const room = await hotelModel.find();
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/getroomsbyid", async (req, res) => {
  const { roomid } = req.body;

  try {
    const room = await hotelModel.findById(roomid);

    if (!room) {
      return res.status(404).json({ message: "Room ID not found" });
    }
    res.json(room);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid room ID format" });
    }
    res.status(500).json({ message: error.message });
  }
});

router.post("/addroom", async (req, res) => {
  try {
    const newroom = new hotelModel(req.body);
    await newroom.save();

    res.send({ message: "New room added successfully" });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
