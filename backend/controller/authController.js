import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET fehlt!");
}

export async function registerUser(req,res){
    try {
        console.log(req.body)
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({
            msg: "Bitte fülle alle Input-Felder aus!",
        });
    }
        // Datenbank abfragen User existiert
        const userExists = await User.findOne({where: {email: email.toLowerCase()}})
        if (userExists) {
            return res.status(400).json({ msg: "Diese:n User:in gibt es schon." });
        }
        // Passwort hashen
         const hashedPW = await bcrypt.hash(password, 12);

        // User in DB eintragen
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPW,
        });

        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: "1d"})
    
        res.cookie("token", token, {
             httpOnly: true,
             sameSite: "none", // Erlaubt das Senden an andere Domains
             secure: true 
        });

        return res.send({msg: "ok", user: {id: user.id}})
    
    } catch (e){
        console.error("Fehler beim registrieren", e)
    }
}

export function loginUser(req,res){

}