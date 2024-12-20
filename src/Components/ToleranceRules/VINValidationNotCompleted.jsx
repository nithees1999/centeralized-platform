import React from 'react';
const VINValidationNotCompleted = () => {
    const filteredData = [
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"Lease","RuleDescription":"VIN Validation not completed","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"VIN Validation Return Status = false and Duplicate VIN = false and Error Message is 'Duplicate VIN. Contact PE or MC personnel, model details not returned' or 'Request has timed out for a response message from AHM Service, model details not returned' or 'VIN not found'","Rule":"600","CreditOrContract":"Contract","Parameter":"","Override":"3,9,4","OpenIssuesQuestions":"","BusinessResponse":"V20 - Updated Rule Logic\nV24 - Update Override Level; Contract Type"},
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"Retail","RuleDescription":"VIN Validation not completed","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"VIN Validation Return Status = false and Duplicate VIN = false and Error Message is 'Duplicate VIN. Contact PE or MC personnel, model details not returned' or 'Request has timed out for a response message from AHM Service, model details not returned' or 'VIN not found'","Rule":"600","CreditOrContract":"Contract","Parameter":"","Override":"3,9,4","OpenIssuesQuestions":"","BusinessResponse":"V20 - Updated Rule Logic\nV24 - Update Override Level; Contract Type"},
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"MC","RuleDescription":"VIN Validation not completed","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"VIN Validation Return Status = false and Duplicate VIN = false and Error Message is 'Duplicate VIN. Contact PE or MC personnel, model details not returned' or 'Request has timed out for a response message from AHM Service, model details not returned' or 'VIN not found'","Rule":"600","CreditOrContract":"Contract","Parameter":"","Override":"3,9,4","OpenIssuesQuestions":"","BusinessResponse":"V20 - Updated Rule Logic\nV24 - Update Override Level; Contract Type"},
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"PE","RuleDescription":"VIN Validation not completed","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"VIN Validation Return Status = false and Duplicate VIN = false and Error Message is 'Duplicate VIN. Contact PE or MC personnel, model details not returned' or 'Request has timed out for a response message from AHM Service, model details not returned' or 'VIN not found'","Rule":"600","CreditOrContract":"Contract","Parameter":"","Override":"3,9,4","OpenIssuesQuestions":"","BusinessResponse":"V20 - Updated Rule Logic\nV24 - Update Override Level; Contract Type"},
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"Marine","RuleDescription":"VIN Validation not completed","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"VIN Validation Return Status = false and Duplicate VIN = false and Error Message is 'Duplicate VIN. Contact PE or MC personnel, model details not returned' or 'Request has timed out for a response message from AHM Service, model details not returned' or 'VIN not found'","Rule":"600","CreditOrContract":"Contract","Parameter":"","Override":"3,9,4","OpenIssuesQuestions":"","BusinessResponse":"V20 - Updated Rule Logic\nV24 - Update Override Level; Contract Type"}
    ];

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">Capitalized Cost Reduction Cash Must Be Greater Than Or Equal To EVtax Credit</h1>
            <section className="py-8 px-4 m-2 border border-black rounded-md">

                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr className='text-blue-900'>
                                <th className="p-4 border border-black">RSS</th>
                                <th className="p-4 border border-black">Wave</th>
                                <th className="p-4 border border-black">CCR/CR</th>
                                <th className="p-4 border border-black">Active/Deactive</th>
                                <th className="p-4 border border-black">Comments</th>
                                <th className="p-4 border border-black min-w-60">Contract Screen</th>
                                <th className="p-4 border border-black">Product</th>
                                <th className="p-4 border border-black">Rule Description</th>
                                <th className="p-4 border border-black">To Dealer (Y/N)</th>
                                <th className="p-4 border border-black">Warning vs Error</th>
                                <th className="p-4 border border-black">When To Use</th>
                                <th className="p-4 border border-black min-w-96">Rule Details / Logic</th>
                                <th className="p-4 border border-black">Rule</th>
                                <th className="p-4 border border-black">Credit or Contract</th>
                                <th className="p-4 border border-black">Parameter</th>
                                <th className="p-4 border border-black">Override</th>
                                <th className="p-4 border border-black">Open Issues / Questions</th>
                                <th className="p-4 border border-black min-w-96">Business Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border border-black">{item.RSS}</td>
                                        <td className="p-2 border border-black">{item.Wave}</td>
                                        <td className="p-2 border border-black">{item.CCR_CR}</td>
                                        <td className="p-2 border border-black">{item.Active_Deactive}</td>
                                        <td className="p-2 border border-black">{item.Comments}</td>
                                        <td className="p-2 border border-black">{item.ContractScreen}</td>
                                        <td className="p-2 border border-black">{item.Product}</td>
                                        <td className="p-2 border border-black">{item.RuleDescription}</td>
                                        <td className="p-2 border border-black">{item.ToDealer}</td>
                                        <td className="p-2 border border-black">{item.WarningVsError}</td>
                                        <td className="p-2 border border-black">{item.WhenToUse}</td>
                                        <td className="p-2 border border-black">{item.RuleDetailsLogic}</td>
                                        <td className="p-2 border border-black">{item.Rule}</td>
                                        <td className="p-2 border border-black">{item.CreditOrContract}</td>
                                        <td className="p-2 border border-black">{item.Parameter}</td>
                                        <td className="p-2 border border-black">{item.Override}</td>
                                        <td className="p-2 border border-black">{item.OpenIssuesQuestions}</td>
                                        <td className="p-2 border border-black">{item.BusinessResponse}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
export default VINValidationNotCompleted;