
import React, { useEffect, useState } from "react";

export default function ModelIsNotEligibleForSentinel() {

    // Search parameters to fetch VIN
    const [searchParams, setSearchParams] = useState({
        Model: ''
    });

    // Handle input changes in the UI form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //variables
    const productType = ["Retail", "Retail", "Lease", "Lease", "Lease"]
    const Condition = ["New", "Used/Certified", "New", "Certified", "OPL"]
    const [termData, setTermData] = useState([]);
    const [VIN, setVIN] = useState("");
    const [year, setYear] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [overRide, setOverRide] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setModel(searchParams.Model)
        if (searchParams.Model && searchParams.Model === "Prologue" ) {
            setTermData([24, 24, 36, 36, 36])
            setVIN("3GPKHURM3RS500012")
            setYear("2024")
            setMake("Honda")
            setOverRide("9")
        } else if(searchParams.Model === "ZDX") {
            setTermData([24, 24, 36, 36, 36])
            setVIN("4W5KHMRK1RZ500001")
            setYear("2024")
            setMake("Acura")
            setOverRide("9")
        }else{
            setTermData([24, 24, 48, 48, 36])
            setVIN("3CZRZ1H3XPM701650")
            setYear("2023/2024")
            setMake("Honda/Acura")
            setOverRide("0")
        }
    };

    //initiate when changes in the form input
    useEffect(() => {
        // handleSearch()
    }, [searchParams.Model]);

    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">Model Is Not Eligible For Sentinel</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <section>
                    <label className="px-1 font-medium" htmlFor="Model">Model:</label>
                    <select name="Model" id="Model" value={searchParams.Model} onChange={handleChange} className="border border-black rounded p-2" required >
                        <option value="">NA</option>
                        <option value="Prologue">Prologue</option>
                        <option value="ZDX">ZDX</option>
                        <option value="Non-EV">Non-EV</option>
                    </select>
                </section>

                <button className="rounded-md p-2 mx-2 border border-black" type="submit">Submit</button>
            </form>

            <section className="min-h-screen py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr>
                                <th className="p-4 border border-black text-blue-700">productType</th>
                                <th className="p-4 border border-black text-blue-700">Condition</th>
                                <th className="p-4 border border-black text-blue-700">VIN</th>
                                <th className="p-4 border border-black text-blue-700">Year</th>
                                <th className="p-4 border border-black text-blue-700">Make</th>
                                <th className="p-4 border border-black text-blue-700">Model</th>
                                <th className="p-4 border border-black text-blue-700">Term</th>
                                <th className="p-4 border border-black text-blue-700">Sentinel</th>
                                <th className="p-4 border border-black text-blue-700">OverRide</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                termData && termData.map((termData, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="p-2 border border-black">{productType[index]}</td>
                                            <td className="p-2 border border-black">{Condition[index]}</td>
                                            <td className="p-2 border border-black">{VIN}</td>
                                            <td className="p-2 border border-black">{year}</td>
                                            <td className="p-2 border border-black">{make}</td>
                                            <td className="p-2 border border-black">{model}</td>
                                            <td className="p-2 border border-black">{termData}</td>
                                            <td className="p-2 border border-black">Grater than Zero</td>
                                            <td className="p-2 border border-black">{overRide}</td>
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