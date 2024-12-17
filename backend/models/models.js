import { pool } from "../connect.js";

const createTable = (query) => {
    pool.query(query, (err, result) => {
        if (err) {
            console.error("Error creating table:", err.message);
        }
    });
};

const createUsersTable = `
CREATE TABLE IF NOT EXISTS USERS(
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createUsersWeatherTable = `
CREATE TABLE IF NOT EXISTS Weather (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    location_name VARCHAR(255),
    country VARCHAR(255),
    temperature DECIMAL(5, 2),
    humidity INT,
    wind_speed DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE
);
`;

createTable(createUsersTable);
createTable(createUsersWeatherTable);