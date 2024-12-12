import React from 'react';
import CommonTableLayout from "./CommonTableLayout"

const AdvanceMonthlyPaymentAndAdvanceSinglePaymentCannotEquelsZero = () => {
    return (
        <div className="p-8">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Advance Monthly Payment And Advance Single Payment Cannot Equels Zero</h1>
            <CommonTableLayout tableName="AMPAASPCEZ" />
        </div>
    );
};

export default AdvanceMonthlyPaymentAndAdvanceSinglePaymentCannotEquelsZero;