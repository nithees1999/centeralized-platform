import React, { useState } from 'react';

const Halo = () => {
    const haloData = [
        { ProductType: 'Retail', Condition: 'Used/Certified', VIN: '3CZRZ2H54PM700436', Year: 2023, Make: 'Honda', Model: 'RZ2H5PEW', Term: 36, CoApplicant: 'N/A', EmploymentStatusApp: 'HALO Honda Associate', EmploymentStatusCoApp: 'HALO AHFC Associate', BuyRate: 9.20, AdjustedRate: 9.33, Difference: 0.13, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 9 },
        { ProductType: 'Balloon', Condition: 'New', VIN: '3CZRZ2H54PM700436', Year: 2023, Make: 'Honda', Model: 'RZ2H5PEW', Term: 36, CoApplicant: 'Joint', EmploymentStatusApp: 'HALO AHFC Associate', EmploymentStatusCoApp: 'N/A', BuyRate: 10.50, AdjustedRate: 10.66, Difference: 0.16, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 9 },
        { ProductType: 'Retail', Condition: 'Used/Certified', VIN: '19UDE4H24PA001612', Year: 2023, Make: 'Acura', Model: 'DE4H2PJW', Term: 24, CoApplicant: 'N/A', EmploymentStatusApp: 'Student', EmploymentStatusCoApp: 'HALO Honda Associate', BuyRate: 6.10, AdjustedRate: 6.25, Difference: 0.15, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 9 },
        { ProductType: 'Retail', Condition: 'Used/Certified', VIN: '19UDE4H24PA001612', Year: 2023, Make: 'Acura', Model: 'DE4H2PJW', Term: 24, CoApplicant: 'Joint', EmploymentStatusApp: 'Employed', EmploymentStatusCoApp: 'HALO Honda Associate', BuyRate: 8.14, AdjustedRate: 8.24, Difference: 0.10, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 9 },
        { ProductType: 'Balloon', Condition: 'New', VIN: '3CZRZ1H3XPM701650', Year: 2023, Make: 'Honda', Model: 'RZ1H3PEW', Term: 24, CoApplicant: 'N/A', EmploymentStatusApp: 'Retired', EmploymentStatusCoApp: 'N/A', BuyRate: 8.70, AdjustedRate: 8.81, Difference: 0.11, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 0 },
        { ProductType: 'Retail', Condition: 'Used/Certified', VIN: '3CZRZ2H54PM700436', Year: 2023, Make: 'Honda', Model: 'RZ2H5PEW', Term: 36, CoApplicant: 'N/A', EmploymentStatusApp: 'Employed', EmploymentStatusCoApp: 'HALO AHFC Associate', BuyRate: 9.20, AdjustedRate: 9.33, Difference: 0.13, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 0 },
        { ProductType: 'Balloon', Condition: 'New', VIN: '3CZRZ2H54PM700436', Year: 2023, Make: 'Honda', Model: 'RZ2H5PEW', Term: 36, CoApplicant: 'Joint', EmploymentStatusApp: 'HALO Honda Associate', EmploymentStatusCoApp: 'HALO AHFC Associate', BuyRate: 10.50, AdjustedRate: 10.66, Difference: 0.16, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 0 },
        { ProductType: 'Retail', Condition: 'Used/Certified', VIN: '19UDE4H24PA001612', Year: 2023, Make: 'Acura', Model: 'DE4H2PJW', Term: 24, CoApplicant: 'N/A', EmploymentStatusApp: 'HALO AHFC Associate', EmploymentStatusCoApp: 'HALO Honda Associate', BuyRate: 6.10, AdjustedRate: 6.25, Difference: 0.15, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 0 },
        { ProductType: 'Retail', Condition: 'Used/Certified', VIN: '19UDE4H24PA001612', Year: 2023, Make: 'Acura', Model: 'DE4H2PJW', Term: 24, CoApplicant: 'Cosigner', EmploymentStatusApp: 'Employed', EmploymentStatusCoApp: 'HALO Honda Associate', BuyRate: 8.14, AdjustedRate: 8.24, Difference: 0.10, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 0 },
        { ProductType: 'Balloon', Condition: 'New', VIN: '3CZRZ1H3XPM701650', Year: 2023, Make: 'Honda', Model: 'RZ1H3PEW', Term: 24, CoApplicant: 'Cosigner', EmploymentStatusApp: 'Retired', EmploymentStatusCoApp: 'N/A', BuyRate: 8.70, AdjustedRate: 8.81, Difference: 0.11, Rule: 'Rate mark-up not permitted for HALO', OverrideLevel: 0 },

    ];
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedEmploymentStatusApp, setSelectedEmploymentStatusApp] = useState('');
    const [selectedEmploymentStatusCoApp, setSelectedEmploymentStatusCoApp] = useState('');
    const [selectedOverride, setSelectedOverride] = useState('');
    const [filteredResults, setFilteredResults] = useState(haloData); // Initialize with all data
    const handleSearch = (e) => {
        e.preventDefault();
        const results = haloData.filter(item => {
            return (
                (selectedProductType ? item.ProductType === selectedProductType : true) &&
                (selectedCondition ? item.Condition === selectedCondition : true) &&
                (selectedEmploymentStatusApp === "Non-Halo Associate"
                    ? ["Student", "Employed", "Retired"].includes(item.EmploymentStatusApp)
                    : (selectedEmploymentStatusApp ? item.EmploymentStatusApp === selectedEmploymentStatusApp : true)) &&
                (selectedEmploymentStatusCoApp ? item.EmploymentStatusCoApp === selectedEmploymentStatusCoApp : true) &&
                (selectedOverride !== "" ? item.OverrideLevel === parseInt(selectedOverride) : true)
            );
        });
        setFilteredResults(results);
    };
    const uniqueProductTypes = [...new Set(haloData.map(item => item.ProductType))];
    const uniqueConditions = [...new Set(haloData.map(item => item.Condition))];
    const uniqueEmploymentStatusApps = [...new Set(haloData.map(item => item.EmploymentStatusApp))];
    const uniqueEmploymentStatusCoApps = [...new Set(haloData.map(item => item.EmploymentStatusCoApp))];
    const uniqueOverride = [...new Set(haloData.map(item => item.OverrideLevel))];




    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">Halo</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}

            >
                <section>
                    <label className="px-1 font-medium" htmlFor="producttype">Product Type:</label>

                    <select value={selectedProductType} onChange={(e) => setSelectedProductType(e.target.value)} className="border border-black rounded p-2" required>
                        <option value="" disabled>NA</option>
                        {uniqueProductTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </section>


                <section>
                    <label className="px-1 font-medium" htmlFor="condition">Condition:</label>
                    <select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="border border-black rounded p-2" required>
                        <option value="" disabled>NA</option>
                        {uniqueConditions.map(condition => <option key={condition} value={condition}>{condition}</option>)}
                    </select>
                </section>


                <section>
                    <label className="px-1 font-medium" htmlFor="EmploymentStatusAPP">Employment Status (App):</label>
                    <select
                        value={selectedEmploymentStatusApp}
                        onChange={(e) => setSelectedEmploymentStatusApp(e.target.value)}
                        className="border border-black rounded p-2"
                        required
                    >
                        <option value="" disabled>NA</option>
                        <option value="Non-Halo Associate">NON-HALO Associate</option>
                        {uniqueEmploymentStatusApps
                            .filter(status => status !== 'Student' && status !== 'Employed' && status !== 'Retired')
                            .map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="EmploymentStatuscoAPP">Employment Status (Co-app):</label>
                    <select value={selectedEmploymentStatusCoApp} onChange={(e) => setSelectedEmploymentStatusCoApp(e.target.value)} className="border border-black rounded p-2" required>
                        <option value="" disabled>NA</option>
                        <option value="Non-Halo Associate">NON-HALO Associate</option>
                        {uniqueEmploymentStatusCoApps.map(status => <option key={status} value={status}>{status}</option>)}
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="override">Override:</label>
                    <select name="override" id="override"
                        value={selectedOverride}
                        onChange={(e) => setSelectedOverride(e.target.value)}
                        className="border border-black rounded p-2"
                    >
                        <option value="">NA</option>
                        {uniqueOverride.map((cond, index) => (
                            <option key={index} value={cond}>{cond}</option>
                        ))}
                    </select>
                </section>
                <button type="submit" className="rounded-md p-2 mx-2 border border-black">Submit</button>
            </form>
            <section className="py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr className='text-blue-900'>
                                <th className="p-4 border border-black">Product Type</th>
                                <th className="p-4 border border-black">Condition</th>
                                <th className="p-4 border border-black">Co-Applicant</th>
                                <th className="p-4 border border-black">Employment Status (App)</th>
                                <th className="p-4 border border-black">Employment Status (Co-app)</th>
                                <th className="p-4 border border-black">Buy Rate</th>
                                <th className="p-4 border border-black">Adjusted Rate</th>
                                <th className="p-4 border border-black">Difference</th>
                                <th className="p-4 border border-black">Rule</th>
                                <th className="p-4 border border-black">Override Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredResults.length > 0 ? (
                                filteredResults.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border border-black">{item.ProductType}</td>
                                        <td className="p-2 border border-black">{item.Condition}</td>
                                        <td className="p-2 border border-black">{item.CoApplicant}</td>
                                        <td className="p-2 border border-black">{item.EmploymentStatusApp}</td>
                                        <td className="p-2 border border-black">{item.EmploymentStatusCoApp}</td>
                                        <td className="p-2 border border-black">{item.BuyRate}</td>
                                        <td className="p-2 border border-black">{item.AdjustedRate}</td>
                                        <td className="p-2 border border-black">{item.Difference}</td>
                                        <td className="p-2 border border-black">{item.Rule}</td>
                                        <td className="p-2 border border-black">{item.OverrideLevel}</td>
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
export default Halo;