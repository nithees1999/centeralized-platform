import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import PaginationButtons from "./PaginationButtons";
import axios from "axios";

export default function VinGenerator() {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const [resetPage, setResetPage] = useState(false);
    const [searchParams, setSearchParams] = useState({
        VIN_Type: '',
        VIN: '',
        Model: '',
        Make: '',
        Year: '',
        MDL_CD: '',
        MSRP_AM: '',
        DLR_INV_AM: '',
        DH_AMT: '',
    });
    const [responseData, setResponseData] = useState([]);
    let responseDataPosts;
    if (responseData && responseData.length > 0) {
        responseDataPosts = responseData.slice(firstPostIndex, lastPostIndex)
    }

    //api call URLs
    const portUrl = "http://localhost:8080"
    const fetchVinDetailsUrl = "/api/fetchVinDetails"
    const filterVinDetailsUrl = "/api/VinFilter"

    const fetchVinDetails = async () => {
        setLoading(true)
        const result = await axios.get(`${portUrl + fetchVinDetailsUrl}`)
        setResponseData(result.data)
        setLoading(false)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        //checking if we have enough parameters for requesting from DB
        let searchParamsLength = Object.values(searchParams).filter(value => value !== null && value !== undefined && value !== "").length
        if (searchParamsLength > 0) {
            try {
                setLoading(true)
                const response = await axios.post(`${portUrl + filterVinDetailsUrl}`, searchParams);
                setResponseData(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        } else {
            fetchVinDetails()
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetchVinDetails()
    }, []);

    return (
        <div className=" p-2 ">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">VIN Generator</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap "
                onSubmit={handleSearch}
            >
                <section>
                    <label className="px-1 font-medium " htmlFor="VIN_Type">VIN type:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
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
                    <label className="px-1 font-medium " htmlFor="VIN">VIN Number:</label>
                    <input
                        className="border border-black rounded p-1 w-44"
                        type="VIN"
                        name="VIN"
                        value={searchParams.VIN}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="Model">Model:</label>
                    <input
                        className="border border-black rounded p-1 w-32"
                        type="text"
                        name="Model"
                        value={searchParams.Model}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="Make">Make:</label>
                    <input
                        className="border border-black rounded p-1 w-32"
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
                        className="border border-black rounded p-1 w-32"
                        name="Year"
                        type="number"
                        min={1950}
                        max={2024}
                        step={1}
                        value={searchParams.Year}
                        onChange={handleChange}
                    />
                </section>

                <button className="rounded-full p-2 mx-2 border border-black" type="submit">
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
                            <th className="p-2 border border-black text-blue-700">MSRP AM</th>
                            <th className="p-2 border border-black text-blue-700">DLR INV AM</th>
                            <th className="p-2 border border-black text-blue-700">DH AMT</th>
                            <th className="p-2 border border-black text-blue-700">MSRP</th>
                            <th className="p-2 border border-black text-blue-700">Invoice</th>
                            <th className="p-2 border border-black text-blue-700">TotalMSRP</th>
                            <th className="p-2 border border-black text-blue-700">TotalDlr</th>
                        </tr>
                    </thead>

                    <tbody className="border border-black">
                        {
                            loading ?
                                <tr key="loading">
                                    <td colSpan={13} className="p-4 text-center w-full text-2xl">
                                        Loading.......
                                    </td>
                                </tr>
                                :
                                responseDataPosts && responseDataPosts.length > 0 ? responseDataPosts.map((element, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border border-black">{element.VIN_Type}</td>
                                        <td className="p-2 border border-black">{element.VIN}</td>
                                        <td className="p-2 border border-black">{element.Model}</td>
                                        <td className="p-2 border border-black">{element.Make}</td>
                                        <td className="p-2 border border-black">{element.Year}</td>
                                        <td className="p-2 border border-black">{element.MDL_CD}</td>
                                        <td className="p-2 border border-black">{element.MSRP_AM}</td>
                                        <td className="p-2 border border-black">{element.DLR_INV_AM}</td>
                                        <td className="p-2 border border-black">{element.DH_AMT}</td>
                                        <td className="p-2 border border-black">{element.Color_Upcharge_MSRP}</td>
                                        <td className="p-2 border border-black">{element.Color_Upcharge_Invoice}</td>
                                        <td className="p-2 border border-black">{element.PIO_Total_MSRP_Amount}</td>
                                        <td className="p-2 border border-black">{element.PIO_Total_Dlr_Invoice_Amount}</td>
                                    </tr>
                                ))
                                    : <tr key="no-data">
                                        <td colSpan={13} className="p-4 text-center w-full text-2xl">
                                            No data available
                                        </td>
                                    </tr>
                        }
                    </tbody>
                </table>

                {responseDataPosts && responseDataPosts.length > 0 &&
                    <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPosts={responseData.length} postsPerPage={postsPerPage} resetPage={resetPage} setResetPage={setResetPage} />
                }

            </section>
        </div>
    );
}