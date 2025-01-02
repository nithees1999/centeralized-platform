import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const BILoyaltyFlexCashClaimAmountDoesNotMatchContractAmount = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>BI Loyalty Flex Cash Claim Amount does not match Contract Amount</h1>
            <CommonTableLayout tableName="BILoyaltyFlexCashClaimAmountDoesNotMatchContractAmount" />
        </div>
    );
};

export default BILoyaltyFlexCashClaimAmountDoesNotMatchContractAmount;