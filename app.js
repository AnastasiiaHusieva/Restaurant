// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "DataDine";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// Add the missing dependencies here
const session = require("express-session"); // For managing sessions
const mongoose = require("mongoose"); // For MongoDB connection

// Define your Mongoose connection here (replace with your MongoDB URI)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Session configuration (make sure to set your own secret)
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Set EJS as the view engine
app.set("view engine", "hbs");

// Serve static files from the 'public' directory
app.use(express.static(__dirname + "/public"));

// Define your routes and route handlers here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const orderRoutes = require("./routes/orders.routes");
app.use("/cart", orderRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/profile", usersRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
