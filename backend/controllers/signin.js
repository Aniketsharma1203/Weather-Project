import { pool } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Manually wrap the callback query in a Promise
        const user = await new Promise((resolve, reject) => {
            pool.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                if (err) return reject(err);
                if (results.length === 0) return reject(new Error("User not found"));
                resolve(results[0]); // Resolve with the first user
            });
        });

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Authentication failed: Incorrect password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY , {
            expiresIn: '1h',
            });
            
            res.cookie("token", token, {
                httpOnly: true,
                secure: true, // Only send over HTTPS
                sameSite: "Strict", // CSRF mitigation
                maxAge: 3600000 // 1 hour
            });
            res.json({ message: "Logged in successfully" });
        console.log("User:", user); // Debugging
    } catch (error) {
        console.error("Error:", error.message);
        if (error.message === "User not found") {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
};
