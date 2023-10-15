const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const authRoute = require("./routes/api/auth");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cors());
app.use(express.json());
app.use(logger(formatsLogger));

app.use("/api/auth", authRoute);

app.use((req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
