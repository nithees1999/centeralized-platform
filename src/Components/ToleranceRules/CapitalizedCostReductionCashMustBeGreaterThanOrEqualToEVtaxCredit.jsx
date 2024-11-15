import React from 'react';
const CapitalizedCostReductionCashMustBeGreaterThanOrEqualToEVtaxCredit = () => {
    const filteredData = [
        { "ProductType": "Lease", "Condition": "New", "VIN": "3GPKHWRM1RS500005", "Year": "2024", "Make": "Honda", "Model": "PROLOGUE", "Term": "36", "CapitalizedCostReductionCash": "7499.99", "EVTaxCreditValue": "7500", "OverrideLevel": "9" },
        { "ProductType": "Lease", "Condition": "New", "VIN": "3GPKHWRM1RS500005", "Year": "2024", "Make": "Honda", "Model": "PROLOGUE", "Term": "36", "CapitalizedCostReductionCash": "7500", "EVTaxCreditValue": "7500", "OverrideLevel": "0" },
        { "ProductType": "Lease", "Condition": "Certified", "VIN": "3GPKHWRM1RS500005", "Year": "2024", "Make": "Honda", "Model": "PROLOGUE", "Term": "24", "CapitalizedCostReductionCash": "7499.99", "EVTaxCreditValue": "7500", "OverrideLevel": "9" },
        { "ProductType": "Lease", "Condition": "Certified", "VIN": "3GPKHWRM1RS500005", "Year": "2024", "Make": "Honda", "Model": "PROLOGUE", "Term": "24", "CapitalizedCostReductionCash": "7500", "EVTaxCreditValue": "7500", "OverrideLevel": "0" },
        { "ProductType": "Lease", "Condition": "New", "VIN": "4W5KHMRK0RZ012609", "Year": "2024", "Make": "Acura", "Model": "ZDX", "Term": "36", "CapitalizedCostReductionCash": "7499.99", "EVTaxCreditValue": "7500", "OverrideLevel": "9" },
        { "ProductType": "Lease", "Condition": "New", "VIN": "4W5KHMRK0RZ012609", "Year": "2024", "Make": "Acura", "Model": "ZDX", "Term": "36", "CapitalizedCostReductionCash": "7500", "EVTaxCreditValue": "7500", "OverrideLevel": "0" },
        { "ProductType": "Lease", "Condition": "Certified", "VIN": "4W5KHMRK0RZ012609", "Year": "2024", "Make": "Acura", "Model": "ZDX", "Term": "24", "CapitalizedCostReductionCash": "7499.99", "EVTaxCreditValue": "7500", "OverrideLevel": "9" },
        { "ProductType": "Lease", "Condition": "Certified", "VIN": "4W5KHMRK0RZ012609", "Year": "2024", "Make": "Acura", "Model": "ZDX", "Term": "24", "CapitalizedCostReductionCash": "7500", "EVTaxCreditValue": "7500", "OverrideLevel": "0" },
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
                                <th className="p-4 border border-black">Product Type</th>
                                <th className="p-4 border border-black">Condition</th>
                                <th className="p-4 border border-black">VIN</th>
                                <th className="p-4 border border-black">Year</th>
                                <th className="p-4 border border-black">Make</th>
                                <th className="p-4 border border-black">Model</th>
                                <th className="p-4 border border-black">Term</th>
                                <th className="p-4 border border-black">Capitalized Cost Reduction Cash</th>
                                <th className="p-4 border border-black">EVTax CreditValue</th>
                                <th className="p-4 border border-black">Override Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border border-black">{item.ProductType}</td>
                                        <td className="p-2 border border-black">{item.Condition}</td>
                                        <td className="p-2 border border-black">{item.VIN}</td>
                                        <td className="p-2 border border-black">{item.Year}</td>
                                        <td className="p-2 border border-black">{item.Make}</td>
                                        <td className="p-2 border border-black">{item.Model}</td>
                                        <td className="p-2 border border-black">{item.Term}</td>
                                        <td className="p-2 border border-black">{item.CapitalizedCostReductionCash}</td>
                                        <td className="p-2 border border-black">{item.EVTaxCreditValue}</td>
                                        <td className="p-2 border border-black">{item.OverrideLevel}</td>
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
export default CapitalizedCostReductionCashMustBeGreaterThanOrEqualToEVtaxCredit;

