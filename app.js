// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
const app = express();
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api", authRoutes);

const dashboardRoutes = require("./routes/dashboard.routes");
app.use("/api", dashboardRoutes);

const circuitRoutes = require("./routes/circuits.routes");
app.use("/api", circuitRoutes);

const driverRoutes = require("./routes/drivers.routes");
app.use("/api", driverRoutes);

const constructorRoutes = require("./routes/constructors.routes");
app.use("/api", constructorRoutes);

// ❗ To handle errors. Routes that don't exist or errors that y    ou handle in specific routes
require("./error-handling")(app);

module.exports = app;
