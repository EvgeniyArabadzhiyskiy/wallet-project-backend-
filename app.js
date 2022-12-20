const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const { authRouter, transactionsRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cors());

app.get("/djon", (req, res) => {
  res.json({ result: "GET Vercel", status: "DJON success" });
});

app.post("/poly", (req, res) => {
  const body = req.body;
  res.json({ result: "POST Vercel", status: "POLY success", body });
});

app.use("/api/users", authRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found 777" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
