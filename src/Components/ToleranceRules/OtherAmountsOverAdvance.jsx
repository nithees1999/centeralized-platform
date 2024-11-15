import React, { useState } from 'react';
const OtherAmountsOverAdvance = () => {
    const data = [
        { ProductType: "Retail", Condition: "New", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10049, Difference: 50, Description: "Other Amounts Over-Advance", Actual: 10049, Override: 0, Release: "2023 June Hotfix" },
        { ProductType: "Retail", Condition: "New", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10049.01, Difference: 50.01, Description: "Other Amounts Over-Advance", Actual: 10049.01, Override: 2, Release: "2023 June Hotfix" },
        { ProductType: "Retail", Condition: "New", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10999, Difference: 1000, Description: "Other Amounts Over-Advance", Actual: 10999, Override: 4, Release: "2023 June Hotfix" },
        { ProductType: "Retail", Condition: "New", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10999.01, Difference: 1000.01, Description: "Other Amounts Over-Advance", Actual: 10999.01, Override: 5, Release: "2023 June Hotfix" },
        { ProductType: "Retail", Condition: "Used/Certified", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10049, Difference: 50, Description: "Other Amounts Over-Advance", Actual: 10049, Override: 0, Release: "2023 June Hotfix" },
        { ProductType: "Retail", Condition: "Used/Certified", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10499, Difference: 500, Description: "Other Amounts Over-Advance", Actual: 10499, Override: 2, Release: "2023 June Hotfix" },
        { ProductType: "Retail", Condition: "Used/Certified", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10499.01, Difference: 500.01, Description: "Other Amounts Over-Advance", Actual: 10499.01, Override: 4, Release: "2023 June Hotfix" },
        { ProductType: "Retail", Condition: "Used/Certified", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10999.01, Difference: 1000.01, Description: "Other Amounts Over-Advance", Actual: 10999.01, Override: 5, Release: "2023 June Hotfix" },
        { ProductType: "Lease", Condition: "New", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10049, Difference: 50, Description: "Other Amount Exceeds Limit", Actual: 10049, Override: 0, Release: "2023 June Hotfix" },
        { ProductType: "Lease", Condition: "New", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10049.01, Difference: 50.01, Description: "Other Amount Exceeds Limit", Actual: 10049.01, Override: 2, Release: "2023 June Hotfix" },
        { ProductType: "Lease", Condition: "New", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10999, Difference: 1000, Description: "Other Amount Exceeds Limit", Actual: 10999, Override: 4, Release: "2023 June Hotfix" },
        { ProductType: "Lease", Condition: "Certified", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10999.01, Difference: 1000.01, Description: "Other Amount Exceeds Limit", Actual: 10999.01, Override: 5, Release: "2023 June Hotfix" },
        { ProductType: "Lease", Condition: "OPL", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10049, Difference: 50, Description: "Other Amount Exceeds Limit", Actual: 10049, Override: 0, Release: "2023 June Hotfix" },
        { ProductType: "Lease", Condition: "OPL", Make: "Honda/Acura", Parameter: 9999, OtherAmount: 10999.01, Difference: 1000.01, Description: "Other Amount Exceeds Limit", Actual: 10999.01, Override: 2, Release: "2023 June Hotfix" },
    ];
    const uniqueProductTypes = [...new Set(data.map(item => item.ProductType))];
    const uniqueConditions = [...new Set(data.map(item => item.Condition))];
    const uniqueOverride = [...new Set(data.map(item => item.Override))];
    const [selectedProductType, setSelectedProductType] = useState('');
    const [selectedCondition, setSelectedCondition] = useState('');
    const [selectedOverride, setSelectedOverride] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const handleSearch = (e) => {
        e.preventDefault(); 
        const filtered = data.filter(item =>
            (selectedProductType ? item.ProductType === selectedProductType : true) &&
            (selectedCondition ? item.Condition === selectedCondition : true) &&
            (selectedOverride !== "" ? item.Override === parseInt(selectedOverride) : true)
        );
        setFilteredData(filtered);
    };
    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">Other Amounts Over Advance</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch} 
            >
                <section>
                    <label className="px-1 font-medium" htmlFor="producttype">Product Type:</label>
                    <select name="producttype" id="producttype"
                        value={selectedProductType}
                        onChange={(e) => setSelectedProductType(e.target.value)}
                        className="border border-black rounded p-2" required
                    >
                        <option value="">NA</option>
                        {uniqueProductTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </section>
                <section>
                    <label className="px-1 font-medium" htmlFor="condition">Condition:</label>
                    <select name="condition" id="condition"
                        value={selectedCondition}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                        className="border border-black rounded p-2" required
                    >
                        <option value="">NA</option>
                        {uniqueConditions.map((cond, index) => (
                            <option key={index} value={cond}>{cond}</option>
                        ))}
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
                            <tr>
                                <th className="p-4 border border-black text-blue-900">Product Type</th>
                                <th className="p-4 border border-black text-blue-900">Condition</th>
                                <th className="p-4 border border-black text-blue-900">Make</th>
                                <th className="p-4 border border-black text-blue-900">Parameter</th>
                                <th className="p-4 border border-black text-blue-900">Other Amount</th>
                                <th className="p-4 border border-black text-blue-900">Difference</th>
                                <th className="p-4 border border-black text-blue-900">Description</th>
                                <th className="p-4 border border-black text-blue-900">Actual</th>
                                <th className="p-4 border border-black text-blue-900">Override</th>
                                <th className="p-4 border border-black text-blue-900">Release</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border border-black">{item.ProductType}</td>
                                        <td className="p-2 border border-black">{item.Condition}</td>
                                        <td className="p-2 border border-black">{item.Make}</td>
                                        <td className="p-2 border border-black">{item.Parameter}</td>
                                        <td className="p-2 border border-black">{item.OtherAmount}</td>
                                        <td className="p-2 border border-black">{item.Difference}</td>
                                        <td className="p-2 border border-black">{item.Description}</td>
                                        <td className="p-2 border border-black">{item.Actual}</td>
                                        <td className="p-2 border border-black">{item.Override}</td>
                                        <td className="p-2 border border-black">{item.Release}</td>
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
export default OtherAmountsOverAdvance;