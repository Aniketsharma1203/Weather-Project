import jwt from "jsonwebtoken";
import { pool } from "../connect.js";

export const handleUserWeatherInfo = async(req, res) => {
    const data = req.body;
    console.log(data);
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user_id = decoded.userId;
    const location_name = data.weatherData.location.name;
    const country = data.weatherData.location.country;
    const temperature = data.weatherData.current.temperature;
    const humidity = data.weatherData.current.humidity;
    const wind_speed = data.weatherData.current.wind_speed;

    if(decoded){
        const query = `INSERT INTO WEATHER (user_id, location_name, country, temperature, humidity, wind_speed ) 
        VALUES (?, ?, ?, ?, ?, ?)`
        pool.query(query, [user_id, location_name, country, temperature, humidity,  wind_speed], (err, results) => {
            if (err) {
                console.error("Error inserting user:", err.message);
                return res.status(500).send(err.message);
            }
            res.status(200).send(results);
        });
    }

};


export const handleWeatherReport = async (req, res) => {
    const query = `
      SELECT 
        u.name, 
        u.email, 
        w.location_name, 
        w.country, 
        w.temperature
      FROM 
        users u
      INNER JOIN 
        weather w ON w.user_id = u.id;
    `;
    
    pool.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching weather report:", err.message);
        return res.status(500).send(err.message);
      }
      return res.status(200).send(results);
    });
  };
  