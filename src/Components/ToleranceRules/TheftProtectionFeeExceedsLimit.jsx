import React from "react";

export default function TheftProtectionFeeExceedsLimit() {

    const difference = [50, 50.01, 1000, 1000.01];

    // Formula Calculation function
    const calculateValues = (parameterValue, difference) => {
        const calculatedTheft = parameterValue + difference;
        let calculatedOverride
        if (difference <= 50) {
            calculatedOverride = "0"
        } else if (difference <= 500) {
            calculatedOverride = "2"
        } else if (difference <= 1000) {
            calculatedOverride = "4"
        } else if (difference > 1000) {
            calculatedOverride = "5"
        }
        return { calculatedTheft, calculatedOverride }
    };

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">Theft Protection Fee Exceeds Limit</h1>

            <section className="min-h-screen py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr>
                                <th className="p-4 border border-black text-blue-700">Product Type</th>
                                <th className="p-4 border border-black text-blue-700">Condition</th>
                                <th className="p-4 border border-black text-blue-700">Make</th>
                                <th className="p-4 border border-black text-blue-700">Parameter</th>
                                <th className="p-4 border border-black text-blue-700">Theft</th>
                                <th className="p-4 border border-black text-blue-700">Difference</th>
                                <th className="p-4 border border-black text-blue-700">Override</th>
                                <th className="p-4 border border-black text-blue-700">Release</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                difference && difference.map((differenceValue, index) => {
                                    const { calculatedTheft, calculatedOverride } = calculateValues(
                                        1000,
                                        parseFloat(difference[index])
                                    );
                                    return (
                                        <tr key={index}>
                                            <td className="p-2 border border-black">Retail</td>
                                            <td className="p-2 border border-black">New & Used/Certified</td>
                                            <td className="p-2 border border-black">Honda/Acura</td>
                                            <td className="p-2 border border-black">1000</td>
                                            <td className="p-2 border border-black">{calculatedTheft}</td>
                                            <td className="p-2 border border-black">{differenceValue}</td>
                                            <td className="p-2 border border-black">{calculatedOverride}</td>
                                            <td className="p-2 border border-black">Wave 36B</td>
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