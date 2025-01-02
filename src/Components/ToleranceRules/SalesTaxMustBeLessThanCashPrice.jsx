import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const SalesTaxMustBeLessThanCashPrice = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Sales Tax must be less than Cash Price</h1>
            <CommonTableLayout tableName="SalesTaxMustBeLessThanCashPrice" />
        </div>
    );
};

export default SalesTaxMustBeLessThanCashPrice;