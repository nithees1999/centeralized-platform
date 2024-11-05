import React, { useState } from 'react';
const ModelIsNotValidForTaxCredit = () => {
    const data = [
        { ProductType: "Lease", Condition: "New", VIN: "2HKRS3H40RH303791", Year: 2024, Make: "Honda", Model: "CRV", Term: 24, EVTaxCredit: 0.01, Description: "Model is not valid for Tax Credit", Override: 9, Release: "ITD 29" },
        { ProductType: "Lease", Condition: "Certified", VIN: "2HKRS3H40RH303791", Year: 2024, Make: "Honda", Model: "CRV", Term: 24, EVTaxCredit: 0.01, Description: "Model is not valid for Tax Credit", Override: 9, Release: "ITD 29" },
        { ProductType: "Lease", Condition: "New", VIN: "19UDE4H20RA002419", Year: 2024, Make: "Acura", Model: "Integra", Term: 36, EVTaxCredit: 0.01, Description: "Model is not valid for Tax Credit", Override: 9, Release: "ITD 29" },
        { ProductType: "Lease", Condition: "Certified", VIN: "19UDE4H20RAD02419", Year: 2024, Make: "Acura", Model: "Integra", Term: 36, EVTaxCredit: 0.01, Description: "Model is not valid for Tax Credit", Override: 9, Release: "ITD 29" },
        { ProductType: "Lease", Condition: "New", VIN: "3GPKHWRM1R$500005", Year: 2024, Make: "Honda", Model: "PROLOGUE", Term: 24, EVTaxCredit: 7500, Description: "Model is not valid for Tax Credit", Override: 0, Release: "ITD 29" },
        { ProductType: "Lease", Condition: "Certified", VIN: "3GPKHWRM1RS500005", Year: 2024, Make: "Honda", Model: "PROLOGUE", Term: 24, EVTaxCredit: 7500, Description: "Model is not valid for Tax Credit", Override: 9, Release: "ITD 29" },
        { ProductType: "Lease", Condition: "New", VIN: "4WSKHMRKORZ012609", Year: 2024, Make: "Acura", Model: "ZDX", Term: 36, EVTaxCredit: 7500, Description: "Model is not valid for Tax Credit", Override: 9, Release: "ITD 29" },
        { ProductType: "Lease", Condition: "Certified", VIN: "4W5KHMRKORZ012609", Year: 2024, Make: "Acura", Model: "ZDX", Term: 36, EVTaxCredit: 7500, Description: "Model is not valid for Tax Credit", Override: 9, Release: "ITD 20" },
    ];
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [submitted, setSubmitted] = useState(false);
    const handleFilterChange = (e) => {
        setSelectedCategory(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const filtered = data.filter(item =>
            (selectedCategory === 'EV' ? ['ZDX', 'PROLOGUE'].includes(item.Model) : ['CRV', 'Integra'].includes(item.Model))
        );
        setFilteredData(filtered);
        setSubmitted(true);
    };
    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">Model is not valid for Tax Credit</h1>
            <form onSubmit={handleSubmit} className="p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap">
                <section>
                    <label className="px-1 font-medium" htmlFor="category">Select Category:</label>
                    <select name="category" id="category"
                        value={selectedCategory}
                        onChange={handleFilterChange}
                        className="border border-black rounded p-2" required
                    >
                        <option value="">Select</option>
                        <option value="EV">EV</option>
                        <option value="Non-EV">Non-EV</option>
                    </select>
                </section>
                <button type="submit" className="rounded-md p-2 mx-2 border border-black">Submit</button>
            </form>
            <section className="min-h-screen py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr>
                                <th className="p-4 border border-black text-blue-700">Product Type</th>
                                <th className="p-4 border border-black text-blue-700">Condition</th>
                                <th className="p-4 border border-black text-blue-700">VIN</th>
                                <th className="p-4 border border-black text-blue-700">Year</th>
                                <th className="p-4 border border-black text-blue-700">Make</th>
                                <th className="p-4 border border-black text-blue-700">Model</th>
                                <th className="p-4 border border-black text-blue-700">Term</th>
                                <th className="p-4 border border-black text-blue-700">EV Tax Credit</th>
                                <th className="p-4 border border-black text-blue-700">Description</th>
                                <th className="p-4 border border-black text-blue-700">Override</th>
                                <th className="p-4 border border-black text-blue-700">Release</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border border-black">{item.ProductType}</td>
                                        <td className="p-2 border border-black">{item.Condition}</td>
                                        <td className="p-2 border border-black">{item.VIN}</td>
                                        <td className="p-2 border border-black">{item.Year}</td>
                                        <td className="p-2 border border-black">{item.Make}</td>
                                        <td className="p-2 border border-black">{item.Model}</td>
                                        <td className="p-2 border border-black">{item.Term}</td>
                                        <td className="p-2 border border-black">{item.EVTaxCredit}</td>
                                        <td className="p-2 border border-black">{item.Description}</td>
                                        <td className="p-2 border border-black">{item.Override}</td>
                                        <td className="p-2 border border-black">{item.Release}</td>
                                    </tr>
                                ))
                            ) : (
                                submitted && (
                                    <tr>
                                        <td colSpan={11} className="text-center p-4 border border-black">No data available</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
export default ModelIsNotValidForTaxCredit;