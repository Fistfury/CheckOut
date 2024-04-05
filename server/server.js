const express = require("express")
const cookieSession = require("cookie-session")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
})
  
)
app.use(express.json())
app.use(cookieSession({
    secret: "s3cr3tk3y",
    maxAge: 1000* 60 * 60,
})
   
)

app.listen(3000, () => console.log("Server is up"))