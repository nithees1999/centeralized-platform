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

//fetch VIN details
app.get('/api/fetchVinDetails', (req, res) => {
    const query = "SELECT * FROM VINDetails"
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.post('/api/VinFilter', (req, res) => {
    const { VINType, VIN, Model, Make, Year } = req.body;

    let query = 'SELECT * FROM VINDetails WHERE 1=1';
    const queryParams = [];

    if (VINType) {
        query += ' AND VINType = ?';
        queryParams.push(VINType);
    }
    if (VIN) {
        query += " AND VIN LIKE ?";
        queryParams.push("%" + VIN + "%");
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

//fetch dealer details
app.get('/api/fetchDealerDetails', (req, res) => {
    const query = "SELECT * FROM dealer"
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.post('/api/DealerFilter', (req, res) => {
    const { state, brand } = req.body;

    let query = 'SELECT * FROM dealer WHERE 1=1';
    const queryParams = [];

    if (state) {
        query += ' AND state = ?';
        queryParams.push(state);
    }
    if (brand) {
        query += ' AND brand = ?';
        queryParams.push(brand);
    }

    db.query(query, queryParams, (err, data) => {
        if (err) return res.json(err);
        return data.length ? res.json(data) : res.status(200).json({ message: "No data available" })
    });
});

//fetch origenate details
app.get('/api/fetchOrigenateDetails', (req, res) => {
    const query = "SELECT * FROM origenate"
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.post('/api/OrigenateFilter', (req, res) => {
    const { ENVType, SecurityProfile } = req.body;

    let query = 'SELECT * FROM origenate WHERE 1=1';
    const queryParams = [];

    if (ENVType) {
        query += ' AND env = ?';
        queryParams.push(ENVType);
    }
    if (SecurityProfile) {
        query += ' AND security_profile = ?';
        queryParams.push(SecurityProfile);
    }

    db.query(query, queryParams, (err, data) => {
        if (err) return res.json(err);
        return data.length ? res.json(data) : res.status(200).json({ message: "No data available" })
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
