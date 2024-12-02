const express = require('express');
const cors = require("cors");
const mysql = require('mssql/msnodesqlv8');
const SqlString = require('tsqlstring');

const config = {
    // server: 'LTIN191785',
    server: 'LTIN527389',
    driver: "SQL Server Native Client 11.0",
    database: "DDS",
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

db.connect()
    .then(() => console.log('Connected to DDS database'))
    .catch(err => console.error('Connection error to DDS:', err));

//MOA - maintenanceOVerAdvance
//fetch tables details
app.get('/api/rulesTable/:option', async (req, res) => {
    const selectedOption = req.params.option;
    try {
        const query = `SELECT * FROM decisionrule.${selectedOption}`;

        const result = await db.query(query); // Use the request method to execute the query

        res.json(result.recordset); // Send the result as JSON
    } catch (err) {
        console.log(err);
    }
})

//fetch VIN details
app.get('/api/fetchVinDetails', async (req, res) => {
    try {
        const query = "SELECT * FROM VINDetails where 1=1";
        const result = await db.query(query); // Use the request method to execute the query
        res.json(result.recordset); // Send the result as JSON
    } catch (err) {
        console.log(err);
    }
})

app.post('/api/VinFilter', async (req, res) => {
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

    const result = await db.query(query);
    res.json(result.recordset);
});

//fetch dealer details
app.get('/api/fetchDealerDetails', async (req, res) => {
    const query = "SELECT * FROM dealer"
    const result = await db.query(query);
    res.json(result.recordset);
})


app.post('/api/DealerFilter', async (req, res) => {
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

    const result = await db.query(query);
    res.json(result.recordset);
});

//fetch origenate details
app.get('/api/fetchOrigenateDetails', async (req, res) => {
    const query = "SELECT * FROM origenate"
    const result = await db.query(query);
    res.json(result.recordset);
})

app.post('/api/OrigenateFilter', async (req, res) => {
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

    const result = await db.query(query);
    res.json(result.recordset);
});


// Get origenate ENV Types
app.get('/api/getEnvTypes', async (req, res) => {
    const query = 'SELECT DISTINCT Env FROM origenate';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['Env']));
});



// AutoApproval
// Get State
app.get('/api/getApprovalStates', async (req, res) => {
    const query = 'SELECT DISTINCT State FROM autoapproval';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['State']));
});
// Get Tier
app.get('/api/getApprovalTiers', async (req, res) => {
    const query = 'SELECT DISTINCT Tier FROM autoapproval';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['Tier']));
});
// Get all data (initial page load)
app.get('/api/autoapproval', async (req, res) => {
    const query = 'SELECT * FROM autoapproval';
    const result = await db.query(query);
    res.json(result.recordset);
});
// Filter Data
app.post('/api/autoapprovalFilter', async (req, res) => {
    const { State, FICO_Score, Tier } = req.body;
    let query = `SELECT * FROM autoapproval WHERE 1=1`;
    let queryParams = [];
    if (State) {
        query += ' AND "State" = ?';
        queryParams.push(State);
    }
    if (FICO_Score) {
        query += ' AND "FICO_Score" = ?';
        queryParams.push(FICO_Score);
    }
    if (Tier) {
        query += ' AND "Tier" = ?';
        queryParams.push(Tier);
    }
    query = SqlString.format(query, queryParams);
    const result = await db.query(query);
    res.json(result.recordset);
});




// CustomerProfile
// Get State
app.get('/api/getStates', async (req, res) => {
    const query = 'SELECT DISTINCT State FROM customerprofile';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['State']));
});
// Get Tier
app.get('/api/getTier', async (req, res) => {
    const query = 'SELECT DISTINCT Tier FROM customerprofile';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['Tier']));
});

// Get ScoreCard Type
app.get('/api/getScoreCardTypes', async (req, res) => {
    const query = 'SELECT DISTINCT ScoreCard_Type FROM customerprofile';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['ScoreCard_Type']));
});
// Get all data (initial page load)
app.get('/api/customerprofile', async (req, res) => {
    const query = 'SELECT * FROM customerprofile';
    const result = await db.query(query);
    res.json(result.recordset);
});

// Filter Data
app.post('/api/customerprofile', async (req, res) => {
    const { State, FICO_Score, Tier, ScoreCard_Type } = req.body;
    let query = `SELECT * FROM customerprofile WHERE 1=1`;
    let queryParams = [];
    if (State) {
        query += ' AND "State" = ?';
        queryParams.push(State);
    }
    if (FICO_Score) {
        query += ' AND "FICO_Score" = ?';
        queryParams.push(FICO_Score);
    }
    if (Tier) {
        query += ' AND "Tier" = ?';
        queryParams.push(Tier);
    }
    if (ScoreCard_Type) {
        query += ' AND "ScoreCard_Type" = ?';
        queryParams.push(ScoreCard_Type);
    }
    query = SqlString.format(query, queryParams);
    const result = await db.query(query);
    res.json(result.recordset);
});



// FCL

app.post('/search', async (req, res) => {
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
        tableName = term === 'Regular' ? 'fcl.regular_term' : 'fcl.extended_term';
    } else if (product === 'Retail & Balloon' && scoreCard === 'THN' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'fcl.incentive_regular' : 'fcl.incentive_extended';
    } else if (product === 'Retail & Balloon' && scoreCard === 'DLQ' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'fcl.DLQ_standard_regular' : 'fcl.DLQ_standard_extended';
    } else if (product === 'Retail & Balloon' && scoreCard === 'DLQ' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'fcl.DLQ_Incentive_regular' : 'fcl.DLQ_Incentive_extended';
    } else if (product === 'Retail & Balloon' && scoreCard === 'CLN' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'fcl.CLN_Standard_regular' : 'fcl.CLN_Standard_extended';
    } else if (product === 'Retail & Balloon' && scoreCard === 'CLN' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'fcl.CLN_Incentive_regular' : 'fcl.CLN_Incentive_extended';
    } else if (product === 'Lease' && scoreCard === 'THN' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'fcl.Lease_THN_Standard_regular' : 'fcl.Lease_THN_Standard_extended';
    } else if (product === 'Lease' && scoreCard === 'THN' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'fcl.Lease_THN_incentive_regular' : 'fcl.Lease_THN_incentive_extended';
    } else if (product === 'Lease' && scoreCard === 'DLQ' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'fcl.Lease_DLQ_standard_regular' : 'fcl.Lease_DLQ_standard_extended';
    } else if (product === 'Lease' && scoreCard === 'DLQ' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'fcl.Lease_DLQ_Incentive_regular' : 'fcl.Lease_DLQ_Incentive_extended';
    } else if (product === 'Lease' && scoreCard === 'CLN' && salesProgram === 'Standard') {
        tableName = term === 'Regular' ? 'fcl.Lease_CLN_Standard_regular' : 'fcl.Lease_CLN_Standard_extended';
    } else if (product === 'Lease' && scoreCard === 'CLN' && salesProgram === 'Incentive & Special') {
        tableName = term === 'Regular' ? 'fcl.Lease_CLN_Incentive_regular' : 'fcl.Lease_CLN_Incentive_extended';
    } else {
        return res.json('No data available');
    }

    const simpleQuery = 'SELECT ?? AS ltvValue, modifier FROM ?? WHERE score_range_start <= ? AND score_range_end >= ?';
    const query = SqlString.format(simpleQuery, [ltvColumn, tableName, score, score]);
    db.query(query, (err, result) => {
        try {
            const data = result.recordset[0];
            const ltvValue = data.ltvValue;
            const modifier = data.modifier;
            const fclValue = ltvValue !== undefined ? ltvValue * modifier : 'No data available';
            res.json(fclValue)
        } catch (error) {
            res.json('Error fetching data');
        }
    });
});


//Residual
// Get VehicleType
app.get('/api/getVehicleType', async (req, res) => {
    const query = 'SELECT DISTINCT Vehicle_Type FROM residual';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['Vehicle_Type']));
});

// Get Finance
app.get('/api/getFinance', async (req, res) => {
    const query = 'SELECT DISTINCT Finance FROM residual';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['Finance']));
});
// Get Vehicle_Year
app.get('/api/getVehicle_Year', async (req, res) => {
    const query = 'SELECT DISTINCT Vehicle_Year FROM residual';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['Vehicle_Year']));
});


// Get all data (initial page load)
app.get('/api/residual', async (req, res) => {
    const query = 'SELECT * FROM residual';
    const result = await db.query(query);
    res.json(result.recordset);
});

// Filter Data
app.post('/api/residual', async (req, res) => {
    const { Vehicle_Type, Finance, Vehicle_Year } = req.body;
    let query = 'SELECT * FROM residual WHERE 1=1';
    let queryParams = [];

    if (Vehicle_Type) {
        query += ' AND "Vehicle_Type" = ?';
        queryParams.push(Vehicle_Type);
    }

    if (Finance) {
        query += ' AND "Finance" = ?';
        queryParams.push(Finance);
    }
    if (Vehicle_Year) {
        query += ' AND "Vehicle_Year" = ?';
        queryParams.push(Vehicle_Year);
    }

    query = SqlString.format(query, queryParams);
    const result = await db.query(query);
    res.json(result.recordset);
});


// Checklist
// Get Description
app.get('/api/getDescription', async (req, res) => {
    const query = 'SELECT DISTINCT Description FROM Checklist';
    const result = await db.query(query);
    res.json(result.recordset.map(item => item['Description']));
});
// Filter Data
app.post('/api/Checklist', async (req, res) => {
    const { Description } = req.body;
    let query = 'SELECT * FROM Checklist WHERE 1=1';
    let queryParams = [];
    if (Description) {
        query += ' AND Description = ?';
        queryParams.push(Description);
    }
    query = SqlString.format(query, queryParams);
    const result = await db.query(query);
    res.json(result.recordset);
});


// Fetch InvalidExcessiveWearAndUse 
app.get('/api/invalidExcessiveWearAndUseTable', async (req, res) => {
    try {
        const query = `SELECT * FROM InvalidExcessiveWearAndUse`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching InvalidExcessiveWearAndUse data:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
 });

// Fetch  ActiveAHFCAccountWithDuplicateVIN 
app.get('/api/ActiveAHFCAccountWithDuplicateVINTable', async (req, res) => {
    try {
        const query = `SELECT * FROM  ActiveAHFCAccountWithDuplicateVIN`;
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching  ActiveAHFCAccountWithDuplicateVIN data:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
 });

 // Fetch  AdvanceExceedsApproval 
app.get('/api/AdvanceExceedsApproval', async (req, res) => {
    try {
        const query = `SELECT * FROM  AdvanceExceedsApproval`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching  AdvanceExceedsApproval:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
 });

 
  // Fetch   MandatoryChecklistItemsAreNotMarkedComplete 
app.get('/api/MandatoryChecklistItemsAreNotMarkedComplete', async (req, res) => {
    try {
        const query = `SELECT * FROM MandatoryChecklistItemsAreNotMarkedComplete`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching   MandatoryChecklistItemsAreNotMarkedComplete:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});


  // Fetch  ContractSalesProgramDoesNotMatchApprovedSalesProgramOrSalesProgramReturnedErrors
  app.get('/api/ContractSalesProgramDoesNotMatchApprovedSalesProgramOrSalesProgramReturnedErrors', async (req, res) => {
    try {
        const query = `SELECT * FROM ContractSalesProgramDoesNotMatchApprovedSalesProgramOrSalesProgramReturnedErrors`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching ContractSalesProgramDoesNotMatchApprovedSalesProgramOrSalesProgramReturnedErrors:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

  // Fetch  CollateralAgeIsGreaterThanParameter
  app.get('/api/CollateralAgeIsGreaterThanParameter', async (req, res) => {
    try {
        const query = `SELECT * FROM CollateralAgeIsGreaterThanParameter`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching CollateralAgeIsGreaterThanParameter:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

  // Fetch  Maximum Mileage is greater than parameter
  app.get('/api/MaximumMileageIsGreaterThanParameter', async (req, res) => {
    try {
        const query = `SELECT * FROM MaximumMileageIsGreaterThanParameter`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching MaximumMileageIsGreaterThanParameter:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});
  // Fetch  VIN is not certified
  app.get('/api/VINIsNotCertified', async (req, res) => {
    try {
        const query = `SELECT * FROM VINIsNotCertified`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching VINIsNotCertified:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});


  // Fetch  InvalidVIN
  app.get('/api/InvalidVIN', async (req, res) => {
    try {
        const query = `SELECT * FROM InvalidVIN`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching InvalidVIN:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

  // Fetch  OrigenateDuplicateVIN
  app.get('/api/OrigenateDuplicateVIN', async (req, res) => {
    try {
        const query = `SELECT * FROM OrigenateDuplicateVIN`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching OrigenateDuplicateVIN:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

 // Fetch  DuplicateVIN
 app.get('/api/DuplicateVIN', async (req, res) => {
    try {
        const query = `SELECT * FROM DuplicateVIN`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching DuplicateVIN:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

 // Fetch  ContractDateIsFutureDated
 app.get('/api/ContractDateIsFutureDated', async (req, res) => {
    try {
        const query = `SELECT * FROM ContractDateIsFutureDated`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching ContractDateIsFutureDated:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

 // Fetch  ContractRateGreaterThanMaxAllowedByMoreThanParameter
 app.get('/api/ContractRateGreaterThanMaxAllowedByMoreThanParameter', async (req, res) => {
    try {
        const query = `SELECT * FROM ContractRateGreaterThanMaxAllowedByMoreThanParameter`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching ContractRateGreaterThanMaxAllowedByMoreThanParameter:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});



 // Fetch  ContractRateExceedsUsuryRate
 app.get('/api/ContractRateExceedsUsuryRate', async (req, res) => {
    try {
        const query = `SELECT * FROM ContractRateExceedsUsuryRate`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching ContractRateExceedsUsuryRate:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});
// Fetch  DealerParticipationExceedsMaxSpread
app.get('/api/DealerParticipationExceedsMaxSpread', async (req, res) => {
    try {
        const query = `SELECT * FROM DealerParticipationExceedsMaxSpread`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching DealerParticipationExceedsMaxSpread:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});
// Fetch  ContractRateIsLessThanMinimumAllowed
app.get('/api/ContractRateIsLessThanMinimumAllowed', async (req, res) => {
    try {
        const query = `SELECT * FROM ContractRateIsLessThanMinimumAllowed`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching ContractRateIsLessThanMinimumAllowed:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});
// Fetch  PaymentScheduleAndTermDoNotMatch
app.get('/api/PaymentScheduleAndTermDoNotMatch', async (req, res) => {
    try {
        const query = `SELECT * FROM PaymentScheduleAndTermDoNotMatch`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching PaymentScheduleAndTermDoNotMatch:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});
// Fetch  ContractTermDoesNotMatchApprovedTerm
app.get('/api/ContractTermDoesNotMatchApprovedTerm', async (req, res) => {
    try {
        const query = `SELECT * FROM ContractTermDoesNotMatchApprovedTerm`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching ContractTermDoesNotMatchApprovedTerm:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});


// Fetch  APRIsNotWithin.125%
app.get('/api/APRIsNotWithin125', async (req, res) => {
    try {
        const query = `SELECT * FROM APRIsNotWithin125`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching APRIsNotWithin125", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

// Fetch  FinanceChargeIsUnderstated
app.get('/api/FinanceChargeIsUnderstated', async (req, res) => {
    try {
        const query = `SELECT * FROM FinanceChargeIsUnderstated`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching FinanceChargeIsUnderstated:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});

// Fetch  InvalidTurnInFee
app.get('/api/InvalidTurnInFee', async (req, res) => {
    try {
        const query = `SELECT * FROM InvalidTurnInFee`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching InvalidTurnInFee:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});
// Fetch  InvalidDaysToFirstPayment
app.get('/api/InvalidDaysToFirstPayment', async (req, res) => {
    try {
        const query = `SELECT * FROM InvalidDaysToFirstPayment`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching InvalidDaysToFirstPayment:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});
// Fetch  PaymentDueDateIsAfterParameterDayOfMonth
app.get('/api/PaymentDueDateIsAfterParameterDayOfMonth', async (req, res) => {
    try {
        const query = `SELECT * FROM PaymentDueDateIsAfterParameterDayOfMonth`; 
        const result = await db.query(query); 
        res.json(result.recordset); 
    } catch (err) {
        console.error("Error fetching PaymentDueDateIsAfterParameterDayOfMonth:", err);
        res.status(500).json({ error: "Error fetching data" });
    }
});



// Sending response to the client
app.get('/', (req, res) => {
    return res.json("From Backend Side")
})

//run on local machine
app.listen(8080, () => {
    console.log(`listening on http://localhost:8080`)
})