const express = require("express");
const cors = require("cors");
const app = express();

const mongoos = require("mongoose");

mongoos.connect(
  "mongodb+srv://tvaultdemo:71aje5OvnSQaHSZr@cluster0.ortn5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const db = mongoos.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());
app.use(cors());

const safesRouter = require("./routes/safes");
app.use("/safes", safesRouter);

app.listen(3002, () => console.log("server started"));
