

import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const InvalidRefundableSecurityDeposit = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Invalid Refundable Security Deposit</h1>
            <CommonTableLayout tableName="InvalidRefundableSecurityDeposit" />
        </div>
    );
};

export default InvalidRefundableSecurityDeposit;