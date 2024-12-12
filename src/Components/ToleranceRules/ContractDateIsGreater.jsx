import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const ContractDateIsGreater = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Contract Date  is greater than X days of Sales Program Effective End Date</h1>
            <CommonTableLayout tableName="CDIGTXDOSPEED" />
        </div>
    );
};

export default ContractDateIsGreater;