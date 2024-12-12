import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const ContractFormState = () => {
    return (
        <div>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Contract Form must be valid for the state OR Contract Date &gt; Contract Form Expiration Date </h1>
            <CommonTableLayout tableName="CFMBVFTSOCDMTCFED" />
        </div>
    );
};

export default ContractFormState;