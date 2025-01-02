import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const DepreciationAmountNotValid = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Depreciation Amount not valid</h1>
            <CommonTableLayout tableName="DepreciationAmountNotValid" />
        </div>
    );
};

export default DepreciationAmountNotValid;