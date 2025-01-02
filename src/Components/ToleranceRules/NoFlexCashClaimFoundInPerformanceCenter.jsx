import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const NoFlexCashClaimFoundInPerformanceCenter = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>No Flex Cash Claim found in Performance Center</h1>
            <CommonTableLayout tableName="NoFlexCashClaimFoundInPerformanceCenter" />
        </div>
    );
};

export default NoFlexCashClaimFoundInPerformanceCenter;