
import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const NegativeEquityNotAllowed = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Negative Equity Not Allowed</h1>
            <CommonTableLayout tableName="NegativeEquityNotAllowed" />
        </div>
    );
};

export default NegativeEquityNotAllowed;