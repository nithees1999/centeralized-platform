import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const FLDocStampFeeIsNotWithinTolerance = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>FL Doc Stamp Fee is not within tolerance</h1>
            <CommonTableLayout tableName="FLDocStampFeeIsNotWithinTolerance" />
        </div>
    );
};

export default FLDocStampFeeIsNotWithinTolerance;