const router = require("express").Router();

const RoomModel = require("../models/Room.model");

//ITERATION 1

//create new rooms
router.post("/room", async (req, res) => {
  console.log(req.body);
  try {
    const result = await RoomModel.create(req.body);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//edit the rooms

router.put("/room/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await RoomModel.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    console.log(result);

    if (!result) {
      return rs.status(404).json({ msg: "Room not found." });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

// see the list of the rooms
router.get("/room", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await RoomtModel.find();

    console.log(result);

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ msg: "Room not found." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

router.get("/room/:id", async (req, res) => {
  try {
    const room = await RoomModel.findOne({ _id: req.params.id }).populate(
      "reviews"
    );
    console.log(room);

    return res.status(200).json(room);
  } catch (err) {
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

//delete the rooms
router.delete("/room/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await RoomModel.deleteOne({ _id: id });

    console.log(result);

    if (result.n === 0) {
      return res.status(404).json({ msg: "Room not found." });
    }

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

module.exports = router;
