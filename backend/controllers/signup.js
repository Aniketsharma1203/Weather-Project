import { pool } from "../connect.js";
import bcrypt from 'bcrypt';

export const handleUserSignup = async(req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("All fields are required.");
    }

    try {
        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const hashedPassword = await bcrypt.hash(password, 10);
        pool.query(query, [name, email, hashedPassword], (err, results) => {
            if (err) {
                console.error("Error inserting user:", err.message);
                return res.status(500).send(err.message);
            }
            res.status(200).send("Signed Up Successfully.");
        });
    } catch (error) {
        console.error("Unexpected error:", error.message);
        res.status(500).send("An unexpected error occurred.");
    }
};