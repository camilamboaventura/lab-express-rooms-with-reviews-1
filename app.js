require("dotenv").config();

const express = require("express");

const PORT = 4000;

const app = express();

const db = require("./config/db.config");
db();

app.use(express.json());

const roomRouter = require("./routes/room.router");

app.use("/", roomRouter);

const reviewRouter = require("./routes/review.router");
app.use("/", reviewRouter);

const userRouter = require("./routes/user.router");
app.use("/", userRouter);

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
