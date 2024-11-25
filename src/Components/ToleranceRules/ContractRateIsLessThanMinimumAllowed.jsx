import React from 'react';
const ContractRateIsLessThanMinimumAllowed = () => {
    const filteredData = [
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"Lease","RuleDescription":"Contract Date  is greater than X days of Sales Program Effective End Date","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"For Lease and Retail Contracts, the Contract Date must be within the Sales Program Expiration Date plus 10 days ","Rule":"385","CreditOrContract":"Contract","Parameter":"10","Override":"4","OpenIssuesQuestions":"Sales Program PED - Effective End Date\nDuplicate to 128?","BusinessResponse":""},
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"Retail","RuleDescription":"Contract Date  is greater than X days of Sales Program Effective End Date","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"For Lease and Retail Contracts, the Contract Date must be within the Sales Program Expiration Date plus 10 days ","Rule":"385","CreditOrContract":"Contract","Parameter":"10","Override":"4","OpenIssuesQuestions":"Sales Program PED - Effective End Date\nDuplicate to 128?","BusinessResponse":""},
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"MC","RuleDescription":"Contract Date  is greater than X days of Sales Program Effective End Date","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"For Lease and Retail Contracts, the Contract Date must be within the Sales Program Expiration Date plus 10 days ","Rule":"385","CreditOrContract":"Contract","Parameter":"10","Override":"4","OpenIssuesQuestions":"Sales Program PED - Effective End Date\nDuplicate to 128?","BusinessResponse":""},
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"PE","RuleDescription":"Contract Date  is greater than X days of Sales Program Effective End Date","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"For Lease and Retail Contracts, the Contract Date must be within the Sales Program Expiration Date plus 10 days ","Rule":"385","CreditOrContract":"Contract","Parameter":"10","Override":"4","OpenIssuesQuestions":"Sales Program PED - Effective End Date\nDuplicate to 128?","BusinessResponse":""},
        {"RSS":"","Wave":"","CCR_CR":"","Active_Deactive":"Active","Comments":"","ContractScreen":"Closing Prep (Contract Info)","Product":"Marine","RuleDescription":"Contract Date  is greater than X days of Sales Program Effective End Date","ToDealer":"Y","WarningVsError":"Warning","WhenToUse":"","RuleDetailsLogic":"For Lease and Retail Contracts, the Contract Date must be within the Sales Program Expiration Date plus 10 days ","Rule":"385","CreditOrContract":"Contract","Parameter":"10","Override":"4","OpenIssuesQuestions":"Sales Program PED - Effective End Date\nDuplicate to 128?","BusinessResponse":""}
    ];

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">Contract Form State &lt;&gt; Dealer State OR Contract Date &gt; Contract Form Expiration Date</h1>
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
                                <th className="p-4 border border-black min-w-96">Rule Description</th>
                                <th className="p-4 border border-black">To Dealer (Y/N)</th>
                                <th className="p-4 border border-black">Warning vs Error</th>
                                <th className="p-4 border border-black">When To Use</th>
                                <th className="p-4 border border-black min-w-96">Rule Details / Logic</th>
                                <th className="p-4 border border-black">Rule</th>
                                <th className="p-4 border border-black">Credit or Contract</th>
                                <th className="p-4 border border-black">Parameter</th>
                                <th className="p-4 border border-black">Override</th>
                                <th className="p-4 border border-black min-w-80">Open Issues / Questions</th>
                                <th className="p-4 border border-black">Business Response</th>
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
export default ContractRateIsLessThanMinimumAllowed;