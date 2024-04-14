const express = require("express");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/usersRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const postnordRoutes = require("./routes/postnordRoutes")

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/postnord", postnordRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
