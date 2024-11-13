import React from 'react';
export default function ModelIsNotValidForTaxCredit(){
    const data = [
        {"ProductType":"Lease","Condition":"New","VIN":"2HKRS3H40RH303791","Year":"2024","Make":"Honda","Model":"CRV","Term":"24","EVTaxCredit":"0.01","Override":"9"},
        {"ProductType":"Lease","Condition":"Certified","VIN":"2HKRS3H40RH303791","Year":"2024","Make":"Honda","Model":"CRV","Term":"24","EVTaxCredit":"0.01","Override":"9"},
        {"ProductType":"Lease","Condition":"New","VIN":"19UDE4H20RA002419","Year":"2024","Make":"Acura","Model":"Integra","Term":"36","EVTaxCredit":"0.01","Override":"9"},
        {"ProductType":"Lease","Condition":"Certified","VIN":"19UDE4H20RA002419","Year":"2024","Make":"Acura","Model":"Integra","Term":"36","EVTaxCredit":"0.01","Override":"9"},
        {"ProductType":"Lease","Condition":"New","VIN":"3GPKHWRM1RS500005","Year":"2024","Make":"Honda","Model":"PROLOGUE","Term":"24","EVTaxCredit":"7500","Override":"0"},
        {"ProductType":"Lease","Condition":"Certified","VIN":"3GPKHWRM1RS500005","Year":"2024","Make":"Honda","Model":"PROLOGUE","Term":"24","EVTaxCredit":"7500","Override":"9"},
        {"ProductType":"Lease","Condition":"New","VIN":"4W5KHMRK0RZ012609","Year":"2024","Make":"Acura","Model":"ZDX","Term":"36","EVTaxCredit":"7500","Override":"9"},
        {"ProductType":"Lease","Condition":"Certified","VIN":"4W5KHMRK0RZ012609","Year":"2024","Make":"Acura","Model":"ZDX","Term":"36","EVTaxCredit":"7500","Override":"9"},
    ];

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">Other Amounts Over Advance</h1>
            <section className="py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr>
                                <th className="p-4 border border-black text-blue-900">Product Type</th>
                                <th className="p-4 border border-black text-blue-900">Condition</th>
                                <th className="p-4 border border-black text-blue-900">VIN</th>
                                <th className="p-4 border border-black text-blue-900">Year</th>
                                <th className="p-4 border border-black text-blue-900">Make</th>
                                <th className="p-4 border border-black text-blue-900">Model</th>
                                <th className="p-4 border border-black text-blue-900">Term</th>
                                <th className="p-4 border border-black text-blue-900">EV Tax Credit</th>
                                <th className="p-4 border border-black text-blue-900">Description</th>
                                <th className="p-4 border border-black text-blue-900">Override</th>
                                <th className="p-4 border border-black text-blue-900">Release</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border border-black">{item.ProductType}</td>
                                        <td className="p-2 border border-black">{item.Condition}</td>
                                        <td className="p-2 border border-black">{item.VIN}</td>
                                        <td className="p-2 border border-black">{item.Year}</td>
                                        <td className="p-2 border border-black">{item.Make}</td>
                                        <td className="p-2 border border-black">{item.Model}</td>
                                        <td className="p-2 border border-black">{item.Term}</td>
                                        <td className="p-2 border border-black">{item.EVTaxCredit}</td>
                                        <td className="p-2 border border-black">Model is not valid for TaxCredit</td>
                                        <td className="p-2 border border-black">{item.Override}</td>
                                        <td className="p-2 border border-black">ITD 29</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center p-4 border border-black">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};