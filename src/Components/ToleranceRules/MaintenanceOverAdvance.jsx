import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MaintenanceOverAdvance() {

    // API call URLs
    const portUrl = "http://localhost:8080";
    const filterVinDetailsUrl = "/api/VinFilter";

    // Search parameters to fetch VIN
    const [searchParams, setSearchParams] = useState({
        VIN: '',
        Condition: '',
        category: '',
    });

    // Handle input changes in the UI form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Searching VIN and storing to display
    const [vinData, setVinData] = useState([]);
    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${portUrl + filterVinDetailsUrl}`, { VIN: searchParams.VIN });
        setVinData(response.data);
        setVinYear(response.data[0].Year)
        setVinModel(response.data[0].Model)
    };

    // Values that depend on category
    const [percentOfInvoiceData, setPercentOfInvoiceData] = useState([]);
    const [TermData, setTermData] = useState(null);
    const [PolicyTermData, setPolicyTermData] = useState([]);
    const [DifferenceData, setDifferenceData] = useState([50, 50, 50.01, 500, 500.01, 1000.01]);
    const [vinYear, setVinYear] = useState(null);
    const [vinModel, setVinModel] = useState(null);
    const [tableTitle, setTableTitle] = useState(null);
    const [productType, setProductType] = useState(null);


    //using useEffect for updating table constants once the input is changed
    useEffect(() => {
        if (searchParams.Condition === "New") {
            if (vinYear === "2024") {
                setTableTitle("2024 Prologue & ZDX VIN (12 Months Complimentary)")
                if (searchParams.Condition === "New") {
                    if (searchParams.category === "MaintOtherCare") {
                        setPercentOfInvoiceData([4, 4, 4, 6, 6, 8]);
                        if (vinModel === "ZDX") {
                            setTermData(36);
                            setPolicyTermData([12, 13, 36, 37, 59, 60]);
                            setProductType("Lease")
                        } else if (vinModel === "Prologue") {
                            setTermData(24);
                            setPolicyTermData([9, 13, 36, 37, 59, 60]);
                            setProductType("Retail")
                        } else if (vinModel === "CR V") {
                            setTableTitle("2024 Non Prologue and ZDX VIN (24 Months Complimentary)")
                            setTermData(48);
                            setPercentOfInvoiceData([4, 4, 6, 6, 8, 8, 8]);
                            setPolicyTermData([24, 25, 49, 71, 72, 84, 84]);
                            setProductType("Retail")
                            setDifferenceData([50, 50, 50.01, 500, 500.01, 1000, 1000.01])
                        }

                    } else if (searchParams.category === "MaintHondaCare") {
                        setPercentOfInvoiceData([6, 6, 6, 8, 8, 10]);
                        if (vinModel === "ZDX") {
                            setTermData(36);
                            setPolicyTermData([12, 13, 36, 37, 59, 60]);
                            setProductType("Lease")
                        } else if (vinModel === "Prologue") {
                            setTermData(24);
                            setPolicyTermData([9, 13, 36, 37, 59, 60]);
                            setProductType("Retail")
                        } else if (vinModel === "CR V") {
                            setTableTitle("2024 Non Prologue and ZDX VIN (24 Months Complimentary)")
                            setTermData(48);
                            setPercentOfInvoiceData([6, 6, 8, 8, 10, 10, 10]);
                            setPolicyTermData([24, 25, 49, 71, 72, 84, 84]);
                            setProductType("Retail")
                            setDifferenceData([50, 50, 50.01, 500, 500.01, 1000, 1000.01])
                        }
                    }
                } else {
                    setTableTitle("")
                    setTermData(null);
                    setPercentOfInvoiceData([]);
                    setPolicyTermData([]);
                    setProductType("")
                    setDifferenceData([])
                }

            } else if (vinYear === "2023") {
                setTableTitle("2023 VIN (24 Months Complimentary )")

                if (searchParams.Condition === "New") {
                    setTermData(60);
                    setPolicyTermData([24, 25, 48, 48, 49, 71, 84]);
                    setProductType("Lease")
                    setDifferenceData([50, 50, 50.01, 500, 500.01, 1000, 1000.01])

                    if (searchParams.category === "MaintOtherCare") {
                        setPercentOfInvoiceData([6, 6, 6, 6, 8, 8, 10]);
                    } else if (searchParams.category === "MaintHondaCare") {
                        setPercentOfInvoiceData([4, 4, 4, 4, 6, 6, 8]);
                    }
                } else {
                    setTableTitle("")
                    setTermData(null);
                    setPercentOfInvoiceData([]);
                    setPolicyTermData([]);
                    setProductType("")
                    setDifferenceData([])
                }
            } else if (vinYear === "2025") {
                setTableTitle("2025 VIN (12 Months Complimentary)")

                setTermData(36);
                setPolicyTermData([12, 15, 24, 39, 48, 84]);
                setProductType("Retail")
                setDifferenceData([1000.01, 50, 50.01, 500, 500.01, 1000.01])

                if (searchParams.category === "MaintOtherCare") {
                    setPercentOfInvoiceData([4, 4, 4, 6, 6, 8]);
                } else if (searchParams.category === "MaintHondaCare") {
                    setPercentOfInvoiceData([6, 6, 6, 8, 8, 10]);
                }

            }
        } else if (searchParams.Condition === "Used/Certified") {
            setTableTitle("Used & Certified Vehicle")
            setProductType("Retail")
            setDifferenceData([50, 50.01, 500.01, 1000.01])

            if (searchParams.category === "MaintOtherCare") {
                setPercentOfInvoiceData([4, 4, 6, 8]);
                setTermData(36);
                setPolicyTermData([6, 24, 48, 84]);
            } else if (searchParams.category === "MaintHondaCare") {
                setPercentOfInvoiceData([0, 0, 0, 0]);
                setTermData(24);
                setPolicyTermData([0, 0, 0, 0]);
            }
        }
    }, [searchParams, vinYear, vinModel]);

    // Formula Calculation function
    const calculateValues = (invoice, dAndH, colorUpCharge, percentOfInvoice, DifferenceData) => {
        const calculatedParameter = (invoice + dAndH + colorUpCharge) * percentOfInvoice / 100;
        const calculatedOptionalMaintenanceContract = calculatedParameter + DifferenceData;
        const calculatedDifference = calculatedOptionalMaintenanceContract - calculatedParameter;
        let calculatedOverride = 0;
        if (DifferenceData <= 50) {
            calculatedOverride = 0;
        } else if (DifferenceData <= 500) {
            calculatedOverride = 2;
        } else if (DifferenceData <= 1000) {
            calculatedOverride = 4;
        } else {
            calculatedOverride = 5;
        }
        return { calculatedParameter, calculatedOptionalMaintenanceContract, calculatedDifference, calculatedOverride };
    };

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">Maintenance over - advance </h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">{tableTitle}</h1>

            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <section>
                    <label className="px-1 font-medium" htmlFor="VIN">VIN:</label>
                    <input name="VIN" value={searchParams.VIN} onChange={handleChange} type="text" className="border border-black rounded p-2" required />
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="Condition">Condition:</label>
                    <select name="Condition" id="Condition" value={searchParams.Condition} onChange={handleChange} className="border border-black rounded p-2" required >
                        <option value="">NA</option>
                        <option value="New">New</option>
                        <option value="Used/Certified">Used/Certified</option>
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="category">Category:</label>
                    <select name="category" id="category" value={searchParams.category} onChange={handleChange} className="border border-black rounded p-2" required>
                        <option value="">NA</option>
                        <option value="MaintOtherCare">Maint - Other Care</option>
                        <option value="MaintHondaCare">Maint - Honda Care </option>
                    </select>
                </section>

                <button className="rounded-md p-2 mx-2 border border-black" type="submit">Submit</button>
            </form>

            {vinData.length ?
                <section className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap">
                    <span className="px-1 font-normal">Product Type:</span>
                    <span className="px-1 font-bold">{productType ? productType : null}</span>
                    <span className="px-1 font-normal">Condition:</span>
                    <span className="px-1 font-bold">{searchParams.Condition ? searchParams.Condition : null}</span>
                    <span className="px-1 font-normal">vin:</span>
                    <span className="px-1 font-bold">{vinData[0].VIN ? vinData[0].VIN : null}</span>
                    <span className="px-1 font-normal">Year:</span>
                    <span className="px-1 font-bold">{vinData[0].Year ? vinData[0].Year : null}</span>
                    <span className="px-1 font-normal">Make:</span>
                    <span className="px-1 font-bold">{vinData[0].Make ? vinData[0].Make : null}</span>
                    <span className="px-1 font-normal">Model:</span>
                    <span className="px-1 font-bold">{vinData[0].Model ? vinData[0].Model : null}</span>
                </section>
                :
                null
            }
            <section className="min-h-screen py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr>
                                <th className="p-4 border border-black text-blue-700">Term</th>
                                <th className="p-4 border border-black text-blue-700">Invoice</th>
                                <th className="p-4 border border-black text-blue-700">D&H</th>
                                <th className="p-4 border border-black text-blue-700">Colorup charge</th>
                                <th className="p-4 border border-black text-blue-700">% of Invoice</th>
                                <th className="p-4 border border-black text-blue-700">Parameter</th>
                                <th className="p-4 border border-black text-blue-700">Optional Maintenance contract</th>
                                <th className="p-4 border border-black text-blue-700">Difference</th>
                                <th className="p-4 border border-black text-blue-700">Company/ Provider Name</th>
                                <th className="p-4 border border-black text-blue-700">Policy term</th>
                                <th className="p-4 border border-black text-blue-700">Actual</th>
                                <th className="p-4 border border-black text-blue-700">Parameter</th>
                                <th className="p-4 border border-black text-blue-700">Override</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vinData && vinData.map((element) => (
                                <React.Fragment key={element.VIN}>
                                    {
                                        percentOfInvoiceData && percentOfInvoiceData.map((percentOfInvoiceValue, index) => {
                                            const { calculatedParameter, calculatedOptionalMaintenanceContract, calculatedDifference, calculatedOverride } = calculateValues(
                                                parseInt(element.DLR_INV_AM),
                                                parseInt(element.DH_AMT),
                                                parseInt(element.Color_Upcharge_MSRP),
                                                percentOfInvoiceValue,
                                                DifferenceData[index],
                                            );
                                            return (
                                                <tr key={index}>
                                                    <td className="p-2 border border-black">{TermData}</td>
                                                    <td className="p-2 border border-black">{element.DLR_INV_AM}</td>
                                                    <td className="p-2 border border-black">{element.DH_AMT}</td>
                                                    <td className="p-2 border border-black">{element.Color_Upcharge_MSRP}</td>
                                                    <td className="p-2 border border-black">{percentOfInvoiceData[index]}</td>
                                                    <td className="p-2 border border-black">{calculatedParameter.toFixed(2)}</td>
                                                    <td className="p-2 border border-black">{calculatedOptionalMaintenanceContract.toFixed(2)}</td>
                                                    <td className="p-2 border border-black">{calculatedDifference.toFixed(2)}</td>
                                                    <td className="p-2 border border-black">{searchParams.category}</td>
                                                    <td className="p-2 border border-black">{PolicyTermData[index]}</td>
                                                    <td className="p-2 border border-black">{calculatedOptionalMaintenanceContract.toFixed(2)}</td>
                                                    <td className="p-2 border border-black">{index === 0 ? 0 : calculatedParameter.toFixed(2)}</td>
                                                    <td className="p-2 border border-black">{index === 0 ? 4 : calculatedOverride.toFixed(2)}</td>
                                                </tr>
                                            );
                                        })}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}
