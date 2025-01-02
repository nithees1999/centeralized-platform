
import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const EstimatedFeesAndTaxesUnderstated = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Estimated Fees and Taxes Understated</h1>
            <CommonTableLayout tableName="EstimatedFeesAndTaxesUnderstated" />
        </div>
    );
};

export default EstimatedFeesAndTaxesUnderstated;