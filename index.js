const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/notes.routes.js");

const app = express();

// DB Connections
connectDB();

// middlewares
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/todos", todoRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`App running on port: ${process.env.PORT}`);
});
