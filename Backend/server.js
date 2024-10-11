const express = require('express');
const cors = require("cors");
const mysql = require('mssql/msnodesqlv8');
const SqlString = require('tsqlstring');

const config = {
    server: 'LTIN527389',
    driver: "SQL Server Native Client 11.0",
    database: "ForTestDB",
    connectionTimeout: 150000,
    options: {
        encrypt: false,
        trustedConnection: true
    }
};

const config2 = {
    server: 'LTIN527389',
    driver: "SQL Server Native Client 11.0",
    database: "rules",
    connectionTimeout: 150000,
    options: {
        encrypt: false,
        trustedConnection: true
    }
};

const app = express();
app.use(cors());
app.use(express.json());
const db = new mysql.ConnectionPool(config);
const db2 = new mysql.ConnectionPool(config2);

db.connect()
    .then(() => console.log('Connected to ForTestDB'))
    .catch(err => console.error('Connection error to ForTestDB:', err));

    db2.connect()
    .then(() => console.log('Connected to rules database'))
    .catch(err => console.error('Connection error to rules database:', err));

//fetch VIN details
app.get('/api/fetchVinDetails', async (req, res) => {
    try {
        const query = "SELECT * FROM VINDetails where 1=1";
        // db.then(() => {
        //     mysql.query(query, function (err1, recordset) {
        //         if (err1) { console.log(err1); return res.json(err1); }
        //         res.send(recordset.recordset);
        //     });
        // });
        // const pool = await db; // Wait for the connection pool
        const result = await db.query(query); // Use the request method to execute the query
        
        res.json(result.recordset); // Send the result as JSON
    } catch (err) {
        console.log(err);
    }
})

app.post('/api/VinFilter', (req, res) => {
    const { VIN_Type, VIN, Model, Make, Year } = req.body;

    let query = 'SELECT * FROM VINDetails WHERE 1=1';
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
    query = SqlString.format(query, queryParams);

    db.then(() => {
        mysql.query(query, function (err, data) {
            if (err) return res.json(err);
            res.json(data.recordset);
        });
    });
});

//fetch dealer details
app.get('/api/fetchDealerDetails', (req, res) => {
    const query = "SELECT * FROM dealer"
    db.then(() => {
        mysql.query(query, (err, data) => {
            if (err) return res.json(err);
            return res.json(data.recordset)
        })
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
    query = SqlString.format(query, queryParams);

    db.then(() => {
        mysql.query(query, (err, data) => {
            if (err) return res.json(err);
            res.json(data.recordset);
        });
    });
});

//fetch origenate details
app.get('/api/fetchOrigenateDetails', (req, res) => {
    const query = "SELECT * FROM origenate"
    db.then(() => {
        mysql.query(query, (err, data) => {
            if (err) return res.json(err);
            return res.json(data.recordset)
        })
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
    query = SqlString.format(query, queryParams);

    db.then(() => {
        mysql.query(query, (err, data) => {
            if (err) return res.json(err);
            return res.json(data.recordset)
        });
    });
});

// Get origenate ENV Types
app.get('/api/getEnvTypes', (req, res) => {
    const sql = 'SELECT DISTINCT Env FROM origenate';
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results.recordset.map(row => row['Env']));
        })
    });
});

// AutoApproval
// Get State
app.get('/api/getApprovalStates', (req, res) => {
    const sql = 'SELECT DISTINCT State FROM autoapprovel';
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results.recordset.map(row => row.State));
        })
    });
});
// Get Tier
app.get('/api/getApprovalTier', (req, res) => {
    const sql = 'SELECT DISTINCT Tier FROM autoapprovel';
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results.recordset.map(row => row.Tier));
        })
    });
});
// Get all data (initial page load)
app.get('/api/autoapproval', (req, res) => {
    const sql = 'SELECT * FROM autoapprovel';
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(results.recordset);
        })
    });
});
// Filter Data
app.post('/api/autoapproval', (req, res) => {
    const { State, FicoScore, Tier } = req.body;
    let sql = `SELECT * FROM autoapprovel WHERE 1=1`;
    let queryParams = [];
    if (State) {
        sql += ' AND "State" = ?';
        queryParams.push(State);
    }
    if (FicoScore) {
        sql += ' AND "FICO_Score" = ?';
        queryParams.push(FicoScore);
    }
    if (Tier) {
        sql += ' AND "Tier" = ?';
        queryParams.push(Tier);
    }
    sql = SqlString.format(sql, queryParams);
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results.recordset);
        })
    });
});

// CustomerProfile
// Get State
app.get('/api/getStates', (req, res) => {
    const sql = 'SELECT DISTINCT State FROM customerprofile';
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results.recordset.map(row => row.State));
        })
    });
});
// Get Tier
app.get('/api/getTier', (req, res) => {
    const sql = 'SELECT DISTINCT Tier FROM customerprofile';
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results.recordset.map(row => row.Tier));
        })
    });
});

// Get ScoreCard Type
app.get('/api/getScoreCardTypes', (req, res) => {
    const sql = 'SELECT DISTINCT ScoreCard_Type FROM customerprofile';
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results.recordset.map(row => row['ScoreCard_Type']));
        })
    });
});
// Get all data (initial page load)
app.get('/api/customerprofile', (req, res) => {
    const sql = 'SELECT * FROM customerprofile';
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching data:', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(results.recordset);
        })
    });
});

// Filter Data
app.post('/api/customerprofile', (req, res) => {
    const { State, FicoScore, Tier, ScoreCardType } = req.body;
    let sql = `SELECT * FROM customerprofile WHERE State = ?`;
    let queryParams = [State];
    if (FicoScore) {
        sql += ' AND "FICO_Score" = ?';
        queryParams.push(FicoScore);
    }
    if (Tier) {
        sql += ' AND "Tier" = ?';
        queryParams.push(Tier);
    }
    if (ScoreCardType) {
        sql += ' AND "ScoreCard_Type" = ?';
        queryParams.push(ScoreCardType);
    }
    sql = SqlString.format(sql, queryParams);
    db.then(() => {
        mysql.query(sql, (err, results) => {
            if (err) throw err;
            res.json(results.recordset);
        })
    });
});
// FCL

app.post('/search', (req, res) => {
    const { product, scoreCard, salesProgram, term, score, ltv } = req.body;
    if (!term) {
        return res.json('No data available');
    }
    let ltvColumn;
    if (ltv <= 95) {
        ltvColumn = 'ltv_less_equal_95';
    } else if (ltv > 95 && ltv <= 115) {
        ltvColumn = 'ltv_greater_95_less_equal_115';
    } else if (ltv > 115) {
        ltvColumn = 'ltv_greater_115';
    }
    let tableName;
    if (product === 'Retail & Balloon' && scoreCard === 'THN' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'regular_term' : 'extended_term';
    } else if (product === 'Retail & Balloon' && scoreCard === 'THN' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'incentive_regular' : 'incentive_extended';
    } else if (product === 'Retail & Balloon' && scoreCard === 'DLQ' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'DLQ_standard_regular' : 'DLQ_standard_extended';
    } else if (product === 'Retail & Balloon' && scoreCard === 'DLQ' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'DLQ_Incentive_regular' : 'DLQ_Incentive_extended';
    } else if (product === 'Retail & Balloon' && scoreCard === 'CLN' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'CLN_Standard_regular' : 'CLN_Standard_extended';
    } else if (product === 'Retail & Balloon' && scoreCard === 'CLN' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'CLN_Incentive_regular' : 'CLN_Incentive_extended';
    } else if (product === 'Lease' && scoreCard === 'THN' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'Lease_THN_Standard_regular' : 'Lease_THN_Standard_extended';
    } else if (product === 'Lease' && scoreCard === 'THN' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'Lease_THN_incentive_regular' : 'Lease_THN_incentive_extended';
    } else if (product === 'Lease' && scoreCard === 'DLQ' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'Lease_DLQ_standard_regular' : 'Lease_DLQ_standard_extended';
    } else if (product === 'Lease' && scoreCard === 'DLQ' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'Lease_DLQ_Incentive_regular' : 'Lease_DLQ_Incentive_extended';
    } else if (product === 'Lease' && scoreCard === 'CLN' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'Lease_CLN_Standard_regular' : 'Lease_CLN_Standard_extended';
    } else if (product === 'Lease' && scoreCard === 'CLN' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'Lease_CLN_Incentive_regular' : 'Lease_CLN_Incentive_extended';
    } else {
        return res.json('No data available');
    }

    const query = 'SELECT ?? AS ltvValue, modifier FROM ?? WHERE score_range_start <= ? AND score_range_end >= ?';
    db.query(query, [ltvColumn, tableName, score, score], (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json('Error fetching data');
        } else if (results.length > 0) {
            const data = results[0];
            const ltvValue = data.ltvValue;
            const modifier = data.modifier;
            const fclValue = ltvValue !== undefined ? ltvValue * modifier : 'No data available';
            res.json(fclValue);
        } else {
            res.json('No data available');
        }
    });
});
//Residual
// Get VehicleType
app.get('/api/getVehicleType', (req, res) => {
    const sql = 'SELECT DISTINCT `Vehicle_Type` FROM residual';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Vehicle_Type));
    });
});

// Get Finance
app.get('/api/getFinance', (req, res) => {
    const sql = 'SELECT DISTINCT `Finance` FROM residual';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Finance));
    });
});
// Get Vehicle_Year
app.get('/api/getVehicle_Year', (req, res) => {
    const sql = 'SELECT DISTINCT `Vehicle_Year` FROM residual';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Vehicle_Year));
    });
});


// Get all data (initial page load)
app.get('/api/residual', (req, res) => {
    const sql = 'SELECT * FROM residual';
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
app.post('/api/residual', (req, res) => {
    const { Vehicle_Type, Finance, Vehicle_Year } = req.body;
    let sql = 'SELECT * FROM residual WHERE 1=1';
    let queryParams = [];

    if (Vehicle_Type) {
        sql += ' AND `Vehicle_Type` = ?';
        queryParams.push(Vehicle_Type);
    }

    if (Finance) {
        sql += ' AND `Finance` = ?';
        queryParams.push(Finance);
    }
    if (Vehicle_Year) {
        sql += ' AND `Vehicle_Year` = ?';
        queryParams.push(Vehicle_Year);
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

// Checklist
// Get Description
app.get('/api/getDescription', (req, res) => {
    const sql = 'SELECT DISTINCT `Description` FROM Checklist';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Description));
    });
});

// Get all data (initial page load)
app.get('/api/Checklist', (req, res) => {
    const sql = 'SELECT * FROM Checklist';
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
app.post('/api/Checklist', (req, res) => {
    const { Description } = req.body;
    let sql = 'SELECT * FROM Checklist WHERE 1=1';
    let queryParams = [];
    if (Description) {
        sql += ' AND `Description` = ?';
        queryParams.push(Description);
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
})

//run on local machine
app.listen(8080, () => {
    console.log(`listening on http://localhost:8080`)
})