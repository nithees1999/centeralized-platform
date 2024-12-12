import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const VINValidationNotCompleted = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>VIN Validation Not Completed</h1>
            <CommonTableLayout tableName="VinValidationNotCompleted" />
        </div>
    );
};

export default VINValidationNotCompleted;