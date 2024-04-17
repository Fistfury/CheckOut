const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieSession = require('cookie-session');
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const postnordRoutes = require("./routes/postnordRoutes")
const validateRoutes = require("./routes/validateRoutes")

const app = express();
app.use(
  cors({
    origin: "https://beardcrafter.netlify.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESSION_KEY],
  maxAge: 24 * 60 * 60 * 1000 // 24 timmar
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/postnord", postnordRoutes);
app.use("/api/validate", validateRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
