import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { loginUser, registerUser } from "./controller/authController"
import { getUser } from "./controller/userController"
import { checkAuth } from "./middleware/auth"
import db from "./libs/db"


const PORT = process.env.PORT || 3000
const app = express()

app.use(cors({
    origin:process.env.ORIGIN,
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

// aktuell geht nur neu anlegen, logout, getUser
// app.post("/login", loginUser ) 
app.post("/register", registerUser )
app.get("/getUser", checkAuth, getUser)
app.get("/logout", (req,res) => res.clearCookie("token").send("logout"))

await db.sync({alter: true})

app.listen(PORT, () => console.log("Läuft auf", PORT))