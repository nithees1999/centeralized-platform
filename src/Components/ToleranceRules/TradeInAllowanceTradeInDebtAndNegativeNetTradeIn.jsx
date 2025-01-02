import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const TradeInAllowanceTradeInDebtAndNegativeNetTradeIn = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Trade-in Allowance &gt; Trade-in Debt and Negative Net Trade-in</h1>
            <CommonTableLayout tableName="TradeInAllowanceTradeInDebtAndNegativeNetTradeIn" />
        </div>
    );
};

export default TradeInAllowanceTradeInDebtAndNegativeNetTradeIn;