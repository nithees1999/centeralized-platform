import React from "react";

export default function EVTaxCredit() {

    //variables
    const EVTax = [7500.01, 7499.99, 7500];
    const Override = [5, 5, 0];

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">EV Tax Credit</h1>

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
                                <th className="p-4 border border-black text-blue-900">EV Tax credit value</th>
                                <th className="p-4 border border-black text-blue-900">Override</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                EVTax && EVTax.map((EVTax, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-2 border border-black">Lease</td>
                                            <td className="p-2 border border-black">NEW / OPL / Certified</td>
                                            <td className="p-2 border border-black">3GPKHURM3RS500012</td>
                                            <td className="p-2 border border-black">2024</td>
                                            <td className="p-2 border border-black">Honda / Acura</td>
                                            <td className="p-2 border border-black">Prologue / ZDX</td>
                                            <td className="p-2 border border-black">{EVTax}</td>
                                            <td className="p-2 border border-black">{Override[index]}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}