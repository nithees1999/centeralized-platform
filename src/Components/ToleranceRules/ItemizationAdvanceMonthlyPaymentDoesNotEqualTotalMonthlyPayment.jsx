import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const ItemizationAdvanceMonthlyPaymentDoesNotEqualTotalMonthlyPayment = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Itemization Advance Monthly Payment (1st Month) does not equal Disclosure First Payment Amount</h1>
            <CommonTableLayout tableName="IAMPDNETMP" />
        </div>
    );
};

export default ItemizationAdvanceMonthlyPaymentDoesNotEqualTotalMonthlyPayment;