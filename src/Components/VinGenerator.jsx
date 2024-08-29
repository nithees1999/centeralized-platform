import { FaSearch, FaEye } from "react-icons/fa";
import React, { useEffect, useState } from "react";

export default function VinGenerator() {
    //state for initial data
    const [mydata, setMydata] = useState([]);
    const [hoveredRow, setHoveredRow] = useState(null); // State to track hovered row

    const [searchParams, setSearchParams] = useState({
        VIN_Type: '',
        VIN_ID: '',
        Model: '',
        Make: '',
        Year: '',
        MDL_CD: '',
        MSRP_AM: '',
        DLR_INV_AM: '',
        DH_AMT: '',
    });

    const [responseData, setResponseData] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        let searchParamsLength = Object.values(searchParams).filter(value => value !== null && value !== undefined && value !== "").length
        if (searchParamsLength > 0) {
            setMydata([])
            try {
                const response = await fetch('http://localhost:8080/api/VinFilter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(searchParams),
                });
                const data = await response.json();
                // setMydata("")
                setResponseData(data);
            } catch (error) {
                console.error(error);
            }
        } else {
            //No values provided and exicuted the search feature 
            setResponseData([])
        }
    };

    const handleEyeEnter = (index) => {
        setHoveredRow(index); // Set the index of the row that is hovered
    };

    const handleEyeLeave = () => {
        setHoveredRow(null); // Reset the hovered row index when leaving
    };

    useEffect(() => {
        //fetch only for demo data in the page
        fetch("http://localhost:8080/api/fetchVinDetails")
            .then(res => res.json())
            .then(data => setMydata(data))
            .catch(err => console.log(err));
        // eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className=" p-2 ">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700  ">VIN Generator</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap "
                onSubmit={handleSearch}
            >

                <section>
                    <label className="px-1 font-medium " htmlFor="VIN_Type">VIN type:</label>
                    <select
                        className="border border-black rounded p-1 w-32 "
                        name="VIN_Type"
                        id="VIN_Type"
                        value={searchParams.VIN_Type}
                        onChange={handleChange}
                    >
                        <option value="">NA</option>
                        <option value="VIN">VIN</option>
                        <option value="Auto VIN">Auto VIN</option>
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="VIN_ID">VIN Number:</label>
                    <input
                        className="border border-black rounded p-1 w-44 "
                        type="VIN_ID"
                        name="VIN_ID"
                        value={searchParams.VIN_ID}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="Model">Model:</label>
                    <input
                        className="border border-black rounded p-1 w-32 "
                        type="text"
                        name="Model"
                        value={searchParams.Model}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="Make">Make:</label>
                    <input
                        className="border border-black rounded p-1 w-32 "
                        type="text"
                        name="Make"
                        list="MakeSuggestions"
                        value={searchParams.Make}
                        onChange={handleChange}
                    />
                    <datalist id="MakeSuggestions">
                        <option value="Toyota" />
                        <option value="Honda" />
                        <option value="Ford" />
                    </datalist>
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="Year">Year:</label>
                    <input
                        className="border border-black rounded p-1 w-32 "
                        name="Year"
                        type="number"
                        min={1950}
                        max={2024}
                        step={1}
                        value={searchParams.Year}
                        onChange={handleChange}
                    />
                </section>

                <button className="rounded-full p-2 mx-2 border border-black " type="submit">
                    <FaSearch />
                </button>
            </form>
            <section className="min-h-screen py-8 px-4 m-2 border border-black rounded-md">
                <table className="w-full">
                    <thead className="border border-black ">
                        <tr>
                            <th className="p-2 border border-black text-blue-700">VIN Type</th>
                            <th className="p-2 border border-black text-blue-700">VIN Number</th>
                            <th className="p-2 border border-black text-blue-700">Model</th>
                            <th className="p-2 border border-black text-blue-700">Make</th>
                            <th className="p-2 border border-black text-blue-700">Year</th>
                            <th className="p-2 border border-black text-blue-700">Model ID</th>
                            <th className="p-2 border border-black text-blue-700">Model Details</th>
                        </tr>
                    </thead>

                    <tbody className="border border-black">
                        {
                            mydata.length > 0 ?
                                mydata.map((element, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border border-black">{element.VIN_Type}</td>
                                        <td className="p-2 border border-black">{element.VIN_ID}</td>
                                        <td className="p-2 border border-black">{element.Model}</td>
                                        <td className="p-2 border border-black">{element.Make}</td>
                                        <td className="p-2 border border-black">{element.Year}</td>
                                        <td className="p-2 border border-black">{element.MDL_CD}</td>

                                        <td className="p-2 border border-black relative">
                                            <span className={`inline ${hoveredRow === index ? 'block' : 'hidden'} absolute -top-48 -left-3/4 bg-white border border-black rounded-lg p-2`}>
                                                <div className="p-2 border border-black rounded-t-lg">MSRP_AM: {element.MSRP_AM}</div>
                                                <div className="p-2 border border-black ">DLR_INV_AM: {element.DLR_INV_AM}</div>
                                                <div className="p-2 border border-black ">DH_AMT: {element.DH_AMT}</div>
                                                <div className="p-2 border border-black ">Color_Up_MSRP: {element.Color_Upcharge_MSRP}</div>
                                                <div className="p-2 border border-black ">Color_Up_Invoice: {element.Color_Upcharge_Invoice}</div>
                                                <div className="p-2 border border-black ">PIO_TMSRP_Amount: {element.PIO_Total_MSRP_Amount}</div>
                                                <div className="p-2 border border-black rounded-b-lg">PIO_TDlr_Amount: {element.PIO_Total_Dlr_Invoice_Amount}</div>
                                            </span>
                                            <button
                                                onMouseEnter={() => handleEyeEnter(index)}
                                                onMouseLeave={handleEyeLeave}
                                            >
                                                <FaEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                                :
                                responseData.message === "No data available" ?
                                    <tr key="no-data">
                                        <td colSpan={7} className="p-4 text-center w-full">
                                            No data available
                                        </td>
                                    </tr>
                                    :
                                    responseData.length > 0 ?
                                        responseData.map((element, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="p-2 border border-black">{element.VIN_Type}</td>
                                                <td className="p-2 border border-black">{element.VIN_ID}</td>
                                                <td className="p-2 border border-black">{element.Model}</td>
                                                <td className="p-2 border border-black">{element.Make}</td>
                                                <td className="p-2 border border-black">{element.Year}</td>
                                                <td className="p-2 border border-black">{element.MDL_CD}</td>

                                                <td className="p-2 border border-black relative">
                                                    <span className={`inline ${hoveredRow === index ? 'block' : 'hidden'} absolute -top-48 -left-3/4 bg-white border border-black rounded-lg p-2`}>
                                                        <div className="p-2 border border-black rounded-t-lg">MSRP_AM: {element.MSRP_AM}</div>
                                                        <div className="p-2 border border-black">DLR_INV_AM: {element.DLR_INV_AM}</div>
                                                        <div className="p-2 border border-black">DH_AMT: {element.DH_AMT}</div>
                                                        <div className="p-2 border border-black ">Color_Up_MSRP: {element.Color_Upcharge_MSRP}</div>
                                                        <div className="p-2 border border-black ">Color_Up_Invoice: {element.Color_Upcharge_Invoice}</div>
                                                        <div className="p-2 border border-black ">PIO_TMSRP_Amount: {element.PIO_Total_MSRP_Amount}</div>
                                                        <div className="p-2 border border-black rounded-b-lg">PIO_TDlr_Amount: {element.PIO_Total_Dlr_Invoice_Amount}</div>
                                                    </span>
                                                    <button
                                                        onMouseEnter={() => handleEyeEnter(index)}
                                                        onMouseLeave={handleEyeLeave}
                                                    >
                                                        <FaEye />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr key="no-data">
                                            <td colSpan={7} className="p-4 text-center w-full">
                                                Check values / Provide values for searching
                                            </td>
                                        </tr>
                        }
                    </tbody>

                </table>
            </section>
        </div>
    );
}