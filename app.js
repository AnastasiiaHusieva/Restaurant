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
app.use(express.json());
const capitalize = require("./utils/capitalize");
const projectName = "DataDine";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const orderRoutes = require("./routes/orders.routes");
app.use("/order", orderRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/profile", usersRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

const userAdminRoutes = require("./routes/useradmin.routes");
app.use("/adminusers", userAdminRoutes);

const cartRoutes = require("./routes/cart.routes.js");
app.use("/cart", cartRoutes);

const checkOutRoutes = require("./routes/checkOut.routes.js");
app.use("/checkout", checkOutRoutes);

const adminOrderStatusRoutes = require("./routes/adminOrderStatus.routes.js");
app.use("/adminorderstatus", adminOrderStatusRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
