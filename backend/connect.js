import mysql from 'mysql';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nanhuaniket03',
    database: 'practice',
    connectionLimit: 10, // Number of concurrent connections
});