const express = require('express');
const mysql = require('mysql');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: 'localhost', // Replace with your MySQL host
    user: 'root',      // Replace with your MySQL username
    password: '',      // Replace with your MySQL password
    database: 'react_db' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Define a test route
app.get('/', (req, res) => {
    res.send("Connected to the backend and MySQL database successfully.");
});

// Example route to fetch data from a table
app.get('/feedback', (req, res) => {
    const query = 'SELECT * FROM feedback'; // Replace with your table name
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('An error occurred while fetching data.');
        }
        res.json(results);
    });
});

// Start the server
app.listen(8081, () => {
    console.log("Server is listening on port 8081.");
});
