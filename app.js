const express = require("express");

const PORT = 4000;

const app = express();

const db = require("./config/db.config");
db();

app.use(express.json());

const roomRouter = require("./routes/room.router");

app.use("/", roomRouter);

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
