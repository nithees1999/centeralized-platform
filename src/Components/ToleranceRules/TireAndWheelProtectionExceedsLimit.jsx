import React, { useState } from "react";
export default function TireAndWheelProtectionExceedsLimit() {

    // Search parameters
    const [searchParams, setSearchParams] = useState({
        productType: '',
        condition: '',
        make: ''
    });

    // Handle input changes in the UI form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //options for Category
    const [difference, setDifference] = useState();
    const Parameter = 9999.00
    const [vin, setVin] = useState();
    const [year, setYear] = useState();
    const [model, setModel] = useState();
    const [termData, setTermData] = useState();
    const [make, setMake] = useState();

    // Formula Calculation function
    const calculateValues = (difference) => {
        const calculatedTireAndWheel = Parameter + difference;
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
        return { calculatedTireAndWheel, calculatedOverride }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setDifference([50.00, 50.01, 1000.00, 1000.01])
        const { make } = searchParams;
        setMake(make)

        const setFormData = (VIN, Year, Model, TermData) => {
            setVin(VIN)
            setYear(Year)
            setModel(Model)
            setTermData(TermData)
        };

        if (make === "Honda") {
            console.log("inside the condition")
            setFormData("5FNYF8H5XMB234208", "2023", "PASSPORT", "36")
        } else if (make === "Acura") {
            setFormData("19UDE2F78NA055470", "2023", "ILX", "24")
        }
    };

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">Tire And Wheel Protection Exceeds Limit</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >

                <section>
                    <label className="px-1 font-medium" htmlFor="make">Make:</label>
                    <select name="make" id="make" value={searchParams.make} onChange={handleChange} className="border border-black rounded p-2" required >
                        <option value="">NA</option>
                        <option value="Honda">Honda</option>
                        <option value="Acura">Acura</option>
                    </select>
                </section>

                <button className="rounded-md p-2 mx-2 border border-black" type="submit">Submit</button>
            </form>

            {difference && difference.length ?
                <section className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap">
                    <span className="px-1 font-normal">Product Type:</span>
                    <span className="px-1 font-bold">Retail / Lease</span>
                    <span className="px-1 font-normal">Condition:</span>
                    <span className="px-1 font-bold">New / Used/Certified </span>
                    <span className="px-1 font-normal">vin:</span>
                    <span className="px-1 font-bold">{vin}</span>
                    <span className="px-1 font-normal">Year:</span>
                    <span className="px-1 font-bold">{year}</span>
                    <span className="px-1 font-normal">Make:</span>
                    <span className="px-1 font-bold">{make}</span>
                    <span className="px-1 font-normal">Model:</span>
                    <span className="px-1 font-bold">{model}</span>
                </section>
                :
                null
            }
            <section className="py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr className="text-blue-900">
                                <th className="p-4 border border-black">Term</th>
                                <th className="p-4 border border-black">Parameter</th>
                                <th className="p-4 border border-black">Tire & Wheel</th>
                                <th className="p-4 border border-black">Difference</th>
                                <th className="p-4 border border-black">Override</th>
                                <th className="p-4 border border-black">Release</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                difference && difference.map((differenceValue, index) => {
                                    const { calculatedTireAndWheel, calculatedOverride } = calculateValues(
                                        parseFloat(differenceValue)
                                    );
                                    return (
                                        <tr key={index}>
                                            <td className="p-2 border border-black">{termData}</td>
                                            <td className="p-2 border border-black">{Parameter}</td>
                                            <td className="p-2 border border-black">{calculatedTireAndWheel.toFixed(2)}</td>
                                            <td className="p-2 border border-black">{differenceValue}</td>
                                            <td className="p-2 border border-black">{calculatedOverride}</td>
                                            <td className="p-2 border border-black">ITD28</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}