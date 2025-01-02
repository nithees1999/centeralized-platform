import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const NegativeEquityDoesNotMatchBalanceDueOnTradeIn = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Negative Equity does not match Balance Due on Trade-In</h1>
            <CommonTableLayout tableName="NegativeEquityDoesNotMatchBalanceDueOnTradeIn" />
        </div>
    );
};

export default NegativeEquityDoesNotMatchBalanceDueOnTradeIn;