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
    const query = "SELECT * FROM vindetails"
    db.query(query, (err, data) => {
        if (err) return res.json(err);
        return res.json(data)
    })
})

app.post('/api/VinFilter', (req, res) => {
    const { VIN_Type, VIN_ID, Model, Make, Year } = req.body;

    let query = 'SELECT * FROM vindetails WHERE 1=1';
    const queryParams = [];

    if (VIN_Type) {
        query += ' AND VIN_Type = ?';
        queryParams.push(VIN_Type);
    }
    if (VIN_ID) {
        query += " AND VIN_ID LIKE ?";
        queryParams.push("%" + VIN_ID + "%");
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



// AutoApproval
// Get State
app.get('/api/getApprovalStates', (req, res) => {
  const sql = 'SELECT DISTINCT State FROM autoapproval';
  db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results.map(row => row.State));
  });
});
// Get Tier
app.get('/api/getApprovalTier', (req, res) => {
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
app.post('/api/autoapproval', (req, res) => {
    const { State, FicoScore, Tier } = req.body;
    // Start with the base query
    let sql = 'SELECT * FROM autoapproval WHERE 1=1';
    // Array to hold query parameters
    let queryParams = [];
    // Append conditions based on the request body
    if (State) {
      sql += ' AND State = ?';
      queryParams.push(State);
    }
    if (FicoScore) {
      sql += ' AND FICO_Score = ?';
      queryParams.push(FicoScore);
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





// Customerprofile
// Get State
app.get('/api/getApprovalStates', (req, res) => {
    const sql = 'SELECT DISTINCT State FROM customerprofile';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.State));
    });
  });
  // Get Tier
  app.get('/api/getApprovalTier', (req, res) => {
      const sql = 'SELECT DISTINCT Tier FROM customerprofile';
      db.query(sql, (err, results) => {
          if (err) throw err;
          res.json(results.map(row => row.Tier));
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
      const { State, FicoScore, Tier } = req.body;
      // Start with the base query
      let sql = 'SELECT * FROM customerprofile WHERE 1=1';
      // Array to hold query parameters
      let queryParams = [];
      // Append conditions based on the request body
      if (State) {
        sql += ' AND State = ?';
        queryParams.push(State);
      }
      if (FicoScore) {
        sql += ' AND FICO_Score = ?';
        queryParams.push(FicoScore);
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





 

//FCL

app.get('/api/getProducts', (req, res) => {
    const sql = 'SELECT DISTINCT Product FROM fcl';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results.map(row => row.Product));
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
    const { Product, FicoScore, Tier, ScoreCardType } = req.body;
    let sql = `
        SELECT "Product", "Last Name", "DOB", "House", "Street Name", "Street Type", "City", "State", "Zip Code", "SSN", "FICO Score", "Tier", "ScoreCard Type"
        FROM fcl
        WHERE Product = ?
    `;
    let queryParams = [Product];
    if (FicoScore) {
        sql += ' AND "FICO Score" = ?';
        queryParams.push(FicoScore);
    }
    if (Tier) {
        sql += ' AND "Tier" = ?';
        queryParams.push(Tier);
    }
    if (ScoreCardType) {
        sql += ' AND "ScoreCard Type" = ?';
        queryParams.push(ScoreCardType);
    }
    db.query(sql, queryParams, (err, results) => {
        if (err) throw err;
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