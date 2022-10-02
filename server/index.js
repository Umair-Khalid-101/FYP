const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const user = require("./routes/user-routes");

mongoose.connect(process.env.DATABASE_ACCESS, () =>
  console.log("Database Connected")
);

app.use(cookieParser());

app.use(express.json());

app.use(cors());

app.use("/funderr", user);

app.listen(3001, () => console.log("server is up and running"));
