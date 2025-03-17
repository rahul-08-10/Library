// server.js (Main entry point)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes.js");
const transactionRoutes = require("./routes/transactionRoutes");
const membership =  require("./routes/membershipRoutes.js")
const reportRouters =  require("./routes/reportRoutes");
const databaseConnection  =  require("./config/database");
require('dotenv').config();
const port  =  process.env.PORT || 4000
const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books",  bookRoutes);
app.use("/api/transactions",transactionRoutes);
app.use("/api/memberships", membership);
app.use("/api/reports", reportRouters);
databaseConnection();

