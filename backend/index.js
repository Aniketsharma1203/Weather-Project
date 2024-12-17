import express from "express";
import cors from "cors";
import dotenv  from "dotenv";
import { pool } from "./connect.js";
import './models/models.js'
import handleUserSignup from "./routes/signup.js";
import handleUserLogin from "./routes/signin.js";
import handleUserWeather from "./routes/weather.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

dotenv.config()

// Check if the database is accessible
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
    } else {
        console.log("Connected to MySQL database.");
        connection.release(); // Release the connection back to the pool
    }
});


// // Sample route to test database query
// app.get("/", (req, res) => {
//     pool.query("SELECT 1 + 1 AS solution", (err, results) => {
//         if (err) {
//             console.error("Error executing query:", err.message);
//             res.status(500).send("Database query failed.");
//         } else {
//             res.send(`Database query result: ${results[0].solution}`);
//         }
//     });
// });

app.use('/signup', handleUserSignup);
app.use('/login',handleUserLogin);
app.use('/user',handleUserWeather);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
