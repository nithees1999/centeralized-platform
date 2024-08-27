const express = require('express');
const mysql = require('mysql');
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Test",
})

app.get('/api/fetchVinDetails', (req, res) => {
    const query = "SELECT * FROM VINDetails"
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.post('/api/filter', (req, res) => {
    const { VINType, VIN, Model, Make, Year } = req.body;

    let query = 'SELECT * FROM VINDetails WHERE 1=1';
    const queryParams = [];

    if (VINType) {
        query += ' AND VINType = ?';
        queryParams.push(VINType);
    }
    if (VIN) {
        query += " AND VIN LIKE ?";
        queryParams.push(VIN + "%");
    }
    if (Model) {
        query += ' AND Model = ?';
        queryParams.push(Model);
    }
    if (Make) {
        query += ' AND Make = ?';
        queryParams.push(Make);
    }
    if (Year) {
        query += ' AND Year = ?';
        queryParams.push(Year);
    }


    db.query(query, queryParams, (err, data) => {
        if (err) return res.json(err);
        return data.length ? res.json(data) : res.status(200).json({ message: "No data available" })
    });
});

app.post('/api/sort', (req, res) => {
    const { sortBy, sortOrder = 'ASC' } = req.body;

    // List of allowed columns for sorting to prevent SQL injection
    const allowedColumns = ['VINType', 'VIN', 'Model', 'Make', 'Year'];

    // Check if the provided sortBy column is allowed
    if (!allowedColumns.includes(sortBy)) {
        return res.status(400).json({ error: 'Invalid column name for sorting' });
    }

    // Ensure sortOrder is either 'ASC' or 'DESC'
    const order = sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // Construct the query with the sorting
    const query = `SELECT * FROM VINDetails ORDER BY ${sortBy} ${order}`;

    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

//sending response to the client
app.get('/', (req, res) => {
    return res.json("From Backend Side")
})

//run on local machine
app.listen(8080, () => {
    console.log(`listening on http://localhost:8080`)
})
