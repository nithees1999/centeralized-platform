const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const sql = require('mssql/msnodesqlv8');

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    server: 'LTIN527389',
    port: 1433,
    driver: "SQL Server Native Client 11.0",
    database: "rules",
    connectionTimeout: 150000,
    options: {
        encrypt: false,
        trustedConnection: true
    }
};
const mydb = new sql.connect(config);

//fetch tables details
app.get('/api/rulesTable/:option', (req, res) => {
    const selectedOption = req.params.option;
    try {
        const query = `SELECT * FROM ${selectedOption}`;
        mydb.then(() => {
            sql.query(query, (err1, recordset) => {
                if (err1) { console.log(err1); return res.json(err1); }
                res.send(recordset.recordset);
            });
        });
    } catch (err) {
        console.log(err);
    }
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Test",
})

//fetch VIN details
app.get('/api/fetchVinDetails', (req, res) => {
    const query = "SELECT * FROM vindetails"
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.post('/api/VinFilter', (req, res) => {
    const { VIN_Type, VIN, Model, Make, Year } = req.body;

    let query = 'SELECT * FROM vindetails WHERE 1=1';
    const queryParams = [];

    if (VIN_Type) {
        query += ' AND VIN_Type = ?';
        queryParams.push(VIN_Type);
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
    const { State, Brand } = req.body;

    let query = 'SELECT * FROM dealer WHERE 1=1';
    const queryParams = [];

    if (State) {
        query += ' AND State = ?';
        queryParams.push(State);
    }
    if (Brand) {
        query += ' AND Brand = ?';
        queryParams.push(Brand);
    }

    db.query(query, queryParams, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
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
    const { Env, Security_Profile } = req.body;

    let query = 'SELECT * FROM origenate WHERE 1=1';
    const queryParams = [];

    if (Env) {
        query += ' AND Env = ?';
        queryParams.push(Env);
    }
    if (Security_Profile) {
        query += ' AND Security_Profile = ?';
        queryParams.push(Security_Profile);
    }

    db.query(query, queryParams, (err, data) => {
        if (err) return res.json(err);
        return data.length ? res.json(data) : res.status(200).json({ message: "No data available" })
    });
});

// Get origenate ENV Types
app.get('/api/getEnvTypes', (req, res) => {
    const sql = 'SELECT DISTINCT Env FROM origenate';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row['Env']));
    });
});

//update origenate user password
app.post('/api/updateOrigenateRecord', (req, res) => {
    const { id, data } = req.body;

    if (!id || !data) {
        return res.status(400).send('Missing id or data');
    }

    const query = 'UPDATE origenate SET PASSWORD = ? WHERE User_ID = ?';
    db.query(query, [data, id], (error, results) => {
        if (error) {
            console.error('Error updating record:', error);
            return res.status(500).send('Failed to update record');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Record not found');
        }

        res.status(200).send('Record updated successfully');
    });
});

// AutoApproval
// Get States
app.get('/api/getApprovalStates', (req, res) => {
    const sql = 'SELECT DISTINCT State FROM autoapproval';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.State));
    });
});
// Get Tiers
app.get('/api/getApprovalTiers', (req, res) => {
    const sql = 'SELECT DISTINCT Tier FROM autoapproval';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Tier));
    });
});
// Get all data (initial page load)
app.get('/api/autoapproval', (req, res) => {
    const sql = 'SELECT * FROM autoapproval';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Filter Data
app.post('/api/autoApprovalFilter', (req, res) => {
    const { State, FICO_Score, Tier } = req.body;
    // Start with the base query
    let sql = 'SELECT * FROM autoapproval WHERE 1=1';
    // Array to hold query parameters
    let queryParams = [];
    // Append conditions based on the request body
    if (State) {
        sql += ' AND State = ?';
        queryParams.push(State);
    }
    if (FICO_Score) {
        sql += ' AND FICO_Score = ?';
        queryParams.push(FICO_Score);
    }
    if (Tier) {
        sql += ' AND Tier = ?';
        queryParams.push(Tier);
    }
    // Execute the query with the parameters
    db.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error('Error filtering data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
});





// CustomerProfile
// Get State
app.get('/api/getStates', (req, res) => {
    const sql = 'SELECT DISTINCT `State` FROM customerprofile';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.State));
    });
});
// Get Tiers
app.get('/api/getTier', (req, res) => {
    const sql = 'SELECT DISTINCT `Tier` FROM customerprofile';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Tier));
    });
});
// Get ScoreCard Types
app.get('/api/getScoreCardTypes', (req, res) => {
    const sql = 'SELECT DISTINCT `ScoreCard_Type` FROM customerprofile';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row['ScoreCard_Type']));
    });
});
// Get all data (initial page load)
app.get('/api/customerprofile', (req, res) => {
    const sql = 'SELECT * FROM customerprofile';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});
// Filter Data
app.post('/api/customerprofile', (req, res) => {
    const { State, FICO_Score, Tier, ScoreCard_Type } = req.body;
    let sql = 'SELECT * FROM customerprofile WHERE 1=1';
    let queryParams = [];
    if (State) {
        sql += ' AND `State` = ?';
        queryParams.push(State);
    }
    if (FICO_Score) {
        sql += ' AND `FICO_Score` = ?';
        queryParams.push(FICO_Score);
    }
    if (Tier) {
        sql += ' AND `Tier` = ?';
        queryParams.push(Tier);
    }
    if (ScoreCard_Type) {
        sql += ' AND `ScoreCard_Type` = ?';
        queryParams.push(ScoreCard_Type);
    }
    db.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});







// FCL
// Get Product
app.get('/api/getProducts', (req, res) => {
    const sql = 'SELECT DISTINCT `Product` FROM fcl';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Product));
    });
});
// Get VehicleType
app.get('/api/getVehicleType', (req, res) => {
    const sql = 'SELECT DISTINCT `Vehicle_Type` FROM fcl';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Vehicle_Type));
    });
});
// Get ScoreCard
app.get('/api/getScoreCard', (req, res) => {
    const sql = 'SELECT DISTINCT `Score_Card` FROM fcl';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Score_Card));
    });
});
// Get salesProgram
app.get('/api/getSalesProgram', (req, res) => {
    const sql = 'SELECT DISTINCT `SalesProgram` FROM fcl';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.SalesProgram));
    });
});
// Get Term
app.get('/api/getTerm', (req, res) => {
    const sql = 'SELECT DISTINCT `Term` FROM fcl';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Term));
    });
});
// Get Modifier
app.get('/api/getModifier', (req, res) => {
    const sql = 'SELECT DISTINCT `Modifier` FROM fcl';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Modifier));
    });
});

// Get all data (initial page load)
app.get('/api/fcl', (req, res) => {
    const sql = 'SELECT * FROM fcl';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});
// Filter Data
app.post('/api/fcl', (req, res) => {
    const { Product, Vehicle_Type, Score_Card, SalesProgram, Term, Modifier } = req.body;
    let sql = 'SELECT * FROM fcl WHERE 1=1';
    let queryParams = [];
    if (Product) {
        sql += ' AND `Product` = ?';
        queryParams.push(Product);
    }
    if (Vehicle_Type) {
        sql += ' AND `Vehicle_Type` = ?';
        queryParams.push(Vehicle_Type);
    }
    if (Score_Card) {
        sql += ' AND `Score_Card` = ?';
        queryParams.push(Score_Card);
    }
    if (SalesProgram) {
        sql += ' AND `SalesProgram` = ?';
        queryParams.push(SalesProgram);
    }
    if (Term) {
        sql += ' AND `Term` = ?';
        queryParams.push(Term);
    }
    if (Modifier) {
        sql += ' AND `Modifier` = ?';
        queryParams.push(Modifier);
    }
    db.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

















// Sending response to the client
app.get('/', (req, res) => {
    return res.json("From Backend Side")
});
// Run on local machine
app.listen(8080, () => {
    console.log("listening on http://localhost:8080")
});