const express = require("express")
require('dotenv').config();
const cookieSession = require("cookie-session")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/usersRoutes");
const stripeRoutes = require("./routes/stripeRoutes")

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})
  
)
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)

app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000* 60 * 60
}))

app.use("/api/stripe", stripeRoutes)
   

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))