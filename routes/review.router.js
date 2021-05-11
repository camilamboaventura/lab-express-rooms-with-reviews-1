const router = require("express").Router();

const ReviewModel = require("../models/Review.model");

const RoomModel = require("../models/Room.model");

router.post("/review", async (req, res) => {
  try {
    const newReview = await ReviewModel.create(req.body);

    const updatedReview = await RoomModel.findOneAndUpdate(
      { _id: req.body.roomId },
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    console.log(updatedReview);

    return res.status(201).json(newReview);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
});

router.get("/room/:id/review", async (req, res) => {
  try {
    const reviewsList = await RoomModel.findOne({
      _id: req.params.id,
    }).populate("reviews");

    return res.status(200).json(reviewsList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
