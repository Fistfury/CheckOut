const express = require("express")
const userRoutes = require("./routes/userRoutes")
const cookieSession = require("cookie-session")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})
  
)
app.use(express.json())

app.use("/api/users", userRoutes )

app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000* 60 * 60,
})
   
)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))