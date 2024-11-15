import React, { useEffect, useState } from "react";
import axios from "axios";

export default function GAPIsNotPermitted() {

    // API call URLs
    const portUrl = "http://localhost:8080";
    const filterVinDetailsUrl = "/api/VinFilter";

    // Search parameters to fetch VIN
    const [searchParams, setSearchParams] = useState({
        VIN: '',
        state: '',
        category: '',
        TotalFinanceAmount: '',
        TotalInsuranceAmount: '',
        override: '',
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
    };

    //options for Category
    const [categoryOptions, setCategoryOptions] = useState([])
    const [productType, setProductType] = useState(null);
    const [condition, setCondition] = useState(null);
    const [TermData, setTermData] = useState(null);
    const [GAP, setGAP] = useState([]);

    const setCategoryOptionsFunction = (state) => {
        let options = [];
        if (state === "ExceptCA,IN,SC") {
            options = ["Honda Retail New", "Honda Retail Used/Certified", "Acura Retail New", "Acura Retail Used/Certified", "MC Retail New", "MC Retail Used"];
        } else if (state === "IN") {
            options = ["IN_Honda_Retail_New", "IN_Honda_Retail_Used/Certified", "IN_Acura_Retail_New", "IN_Acura_Retail_Used/Certified", "IN_MC_Retail_New", "IN_MC_Retail_Used"]
        } else if (state === "SC") {
            options = ["SC_Honda_Retail_New", "SC_Honda_Retail_Used/Certified", "SC_Acura_Retail_New", "SC_Acura_Retail_Used/Certified", "SC_MC_Retail_New", "SC_MC_Retail_Used"]
        }
        return options;
    }

    // Formula Calculation function
    const calculateValues = (TotalAmountFinance, TotalInsuranceAmount, MSRPAmount) => {
        const calculatedAdjustedAmout = TotalAmountFinance - TotalInsuranceAmount;
        const calculatedLTVAmount = (calculatedAdjustedAmout / MSRPAmount) * 100
        let claculatedRule
        let calculatedOverrideLevel
        claculatedRule = "LTV <75%, GAP is not permitted"

        if (calculatedLTVAmount < "70") {
            calculatedOverrideLevel = "9"
        } else if (calculatedLTVAmount < "75") {
            calculatedOverrideLevel = "4"
        } else if (calculatedLTVAmount >= "75") {
            calculatedOverrideLevel = "False"
        }
        return { calculatedAdjustedAmout, calculatedLTVAmount, claculatedRule, calculatedOverrideLevel }
    };

    //initiate when changes in the form input
    useEffect(() => {
        const { state, category } = searchParams;
        if (state) {
            setCategoryOptions(setCategoryOptionsFunction(state));
        }

        const setFormData = (ProductType, Conditio, TermData, GAP) => {
            setProductType(ProductType)
            setCondition(Conditio)
            setTermData(TermData)
            setGAP(GAP)
        };

        const commonGAP = ["Y"];
        const commonGAPWithN = ["Y", "Y", "Y", "Y", "N"];

        if (state === "ExceptCA,IN,SC") {
            switch (category) {
                case "Honda Retail New":
                    setFormData("Retail", "New", 24, [...commonGAPWithN, "N"]);
                    break;
                case "Honda Retail Used/Certified":
                    setFormData("Retail", "Used/Certified", 36, [...commonGAPWithN, "N"]);
                    break;
                case "Acura Retail New":
                case "Acura Retail Used/Certified":
                    setFormData("Retail", category.includes("Used") ? "Used/Certified" : "New", 48, commonGAPWithN);
                    break;
                case "MC Retail New":
                case "MC Retail Used":
                    setFormData("MC", category.includes("Used") ? "Used" : "New", 24, [...commonGAPWithN, "N"]);
                    break;
                default:
                    break;
            }
        } else if (state === "IN") {
            switch (category) {
                case "IN_Honda_Retail_New":
                case "IN_Honda_Retail_Used/Certified":
                case "IN_Acura_Retail_New":
                case "IN_Acura_Retail_Used/Certified":
                    setFormData("Retail", category.includes("Used") ? "Used/Certified" : "New", category.includes("Honda_Retail") ? 36 : 48, commonGAP);
                    break;
                case "IN_MC_Retail_New":
                case "IN_MC_Retail_Used":
                    setFormData("MC", category.includes("Used") ? "Used" : "New", 24, commonGAP);
                    break;
                default:
                    break;
            }
        } else if (state === "SC") {
            switch (category) {
                case "SC_Honda_Retail_New":
                case "SC_Honda_Retail_Used/Certified":
                case "SC_Acura_Retail_New":
                case "SC_Acura_Retail_Used/Certified":
                    setFormData("Retail", category.includes("Used") ? "Used/Certified" : "New", category.includes("Honda_Retail") ? 36 : 48, commonGAP);
                    break;
                case "SC_MC_Retail_New":
                case "SC_MC_Retail_Used":
                    setFormData("MC", category.includes("Used") ? "Used" : "New", 24, commonGAP);
                    break;
                default:
                    break;
            }
        }
    }, [searchParams, vinData]);

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">GAP is not permitted</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <section>
                    <label className="px-1 font-medium" htmlFor="VIN">VIN:</label>
                    <input name="VIN" value={searchParams.VIN} onChange={handleChange} type="text" className="border border-black rounded p-2" required />
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="TotalFinanceAmount">TotalFinanceAmount:</label>
                    <input name="TotalFinanceAmount" value={searchParams.TotalFinanceAmount} onChange={handleChange} type="text" className="border border-black rounded p-2" required />
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="TotalInsuranceAmount">TotalInsuranceAmount:</label>
                    <input name="TotalInsuranceAmount" value={searchParams.TotalInsuranceAmount} onChange={handleChange} type="text" className="border border-black rounded p-2" required />
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="state">State:</label>
                    <select name="state" id="state" value={searchParams.state} onChange={handleChange} className="border border-black rounded p-2" required >
                        <option value="">NA</option>
                        <option value="ExceptCA,IN,SC">Except CA,IN,SC</option>
                        <option value="IN">IN</option>
                        <option value="SC">SC</option>
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="category">Category:</label>
                    <select name="category" id="category" value={searchParams.category} onChange={handleChange} className="border border-black rounded p-2" required>
                        <option value="">NA</option>
                        {categoryOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium" htmlFor="override">Override:</label>
                    <select name="override" id="override" value={searchParams.override} onChange={handleChange} className="border border-black rounded p-2">
                        <option value="">All</option>
                        <option value="False">False</option>
                        <option value="4">4</option>
                        <option value="9">9</option>
                    </select>
                </section>

                <button className="rounded-md p-2 mx-2 border border-black" type="submit">Submit</button>
            </form>

            {vinData.length ?
                <section className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap">
                    <span className="px-1 font-normal">Product Type:</span>
                    <span className="px-1 font-bold">{productType ? productType : null}</span>
                    <span className="px-1 font-normal">Condition:</span>
                    <span className="px-1 font-bold">{condition ? condition : null}</span>
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
                            <tr className='text-blue-900'>
                                <th className="p-4 border border-black">Term</th>
                                <th className="p-4 border border-black">GAP</th>
                                <th className="p-4 border border-black">Total Amount Finance</th>
                                <th className="p-4 border border-black">Total Insurance Amount</th>
                                <th className="p-4 border border-black">Adjusted Amount</th>
                                <th className="p-4 border border-black">MSRP</th>
                                <th className="p-4 border border-black">LTV</th>
                                <th className="p-4 border border-black">Rule</th>
                                <th className="p-4 border border-black">Override level</th>
                                <th className="p-4 border border-black">Release</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vinData && vinData.map((element) => (
                                <React.Fragment key={element.VIN}>
                                    {

                                        GAP && GAP.map((GAPValue, index) => {
                                            const { calculatedAdjustedAmout, calculatedLTVAmount, claculatedRule, calculatedOverrideLevel } = calculateValues(
                                                parseInt(searchParams.TotalFinanceAmount),
                                                parseInt(searchParams.TotalInsuranceAmount),
                                                parseInt(element.MSRP_AM)
                                            );

                                            // Apply filtering based on selected Override value
                                            if (
                                                searchParams.override &&
                                                calculatedOverrideLevel !== searchParams.override 
                                            ) {
                                                return null; // Skip this row if it doesn't match the selected Override level
                                            }

                                            return (
                                                <tr key={index}>
                                                    <td className="p-2 border border-black">{TermData}</td>
                                                    <td className="p-2 border border-black">{GAPValue}</td>
                                                    <td className="p-2 border border-black">{searchParams.TotalFinanceAmount}</td>
                                                    <td className="p-2 border border-black">{searchParams.TotalInsuranceAmount}</td>
                                                    <td className="p-2 border border-black">{calculatedAdjustedAmout}</td>
                                                    <td className="p-2 border border-black">{element.MSRP_AM}</td>
                                                    <td className="p-2 border border-black">{calculatedLTVAmount.toFixed(2)}</td>
                                                    <td className="p-2 border border-black">{claculatedRule}</td>
                                                    <td className="p-2 border border-black">{calculatedOverrideLevel}</td>
                                                    <td className="p-2 border border-black">Wave 37B</td>
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
    )
}