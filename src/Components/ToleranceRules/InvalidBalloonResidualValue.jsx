
import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const InvalidBalloonResidualValue = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Invalid Balloon Residual Value</h1>
            <CommonTableLayout tableName="InvalidBalloonResidualValue" />
        </div>
    );
};

export default InvalidBalloonResidualValue;