import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { VscDebugStepBack } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import PaginationButtons from "./PaginationButtons";
import axios from "axios";
import LoadingIcons from 'react-loading-icons'
import Select from 'react-select';

export default function VinGenerator() {
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const [resetPageNumber, setResetPageNumber] = useState(false);
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
    const [requestHistory, setRequestHistory] = useState([]) //state for Back button

    //api call URLs
    const portUrl = "http://localhost:8080"
    const fetchVinDetailsUrl = "/api/fetchVinDetails"
    const filterVinDetailsUrl = "/api/VinFilter"

    const fetchVinDetails = async () => {
        setLoading(true)
        const response = await axios.get(`${portUrl + fetchVinDetailsUrl}`)
        setResponseData(response.data)
        setLoading(false)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setResetPageNumber(true)
        setselectedOptionFields(selectedOption)
        //checking if we have enough parameters for requesting from DB
        let searchParamsLength = Object.values(searchParams).filter(value => value !== null && value !== undefined && value !== "").length
        if (searchParamsLength > 0) {
            try {
                setLoading(true)
                // Save current request details for back functionality
                setRequestHistory(prevHistory => [
                    ...prevHistory,
                    { params: searchParams, endpoint: filterVinDetailsUrl }
                ]);
                const response = await axios.post(`${portUrl + filterVinDetailsUrl}`, searchParams);
                setResponseData(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    //dropdown multiSelect
    const options = [
        { value: 'MSRP_AM', label: 'MSRP AM' },
        { value: 'DLR_INV_AM', label: 'DLR INV AM' },
        { value: 'DH_AMT', label: 'DH AMT' },
        { value: 'Color_Upcharge_MSRP', label: 'MSRP' },
        { value: 'Color_Upcharge_Invoice', label: 'Invoice' },
        { value: 'PIO_Total_MSRP_Amount', label: 'TotalMSRP' },
        { value: 'PIO_Total_Dlr_Invoice_Amount', label: 'TotalDlr' },
    ];
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptionFields, setselectedOptionFields] = useState(null);
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? 'black' : 'black', //select box styling
            boxShadow: state.isFocused ? '0 0 0 1px black' : null,
            "&:hover": {
                borderColor: 'black'
            },
            padding: '2px'
        }),
        option: (provided) => ({
            ...provided,
            backgroundColor: "white",  // Background color for selected option 
            "&:hover": {
                backgroundColor: "gray", // Background color when an option is hovered
                color: "white"
            },
        }),
    }

    const handleReset = () => {
        setSearchParams({
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
        fetchVinDetails()
        setRequestHistory([]);
    };

    const handleBack = async () => {
        if (requestHistory.length > 1) {
            const previousRequest = requestHistory[requestHistory.length - 2];  // Get the last second request
            const newHistory = requestHistory.slice(0, -1);  // Remove the last request from history
            setRequestHistory(newHistory);  // Update history
            const { params, endpoint } = previousRequest;
            try {
                setLoading(true);
                const response = await axios.post(`${portUrl + endpoint}`, params);// Re-fetch data using the stored request details
                setResponseData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        } else {
            setRequestHistory([]);
            console.log("cleared")
        }
        console.log(requestHistory)
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
                        className="border border-black rounded p-2"
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
                        className="border border-black rounded p-2"
                        name="VIN"
                        id="VIN"
                        value={searchParams.VIN}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="Model">Model:</label>
                    <input
                        className="border border-black rounded p-2"
                        type="text"
                        name="Model"
                        id="Model"
                        value={searchParams.Model}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="Make">Make:</label>
                    <input
                        className="border border-black rounded p-2"
                        type="text"
                        name="Make"
                        id="Make"
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
                        className="border border-black rounded p-2"
                        name="Year"
                        id="Year"
                        type="number"
                        min={1950}
                        max={2024}
                        step={1}
                        value={searchParams.Year}
                        onChange={handleChange}
                    />
                </section>

                {/* columns dropdown */}
                <div className="flex items-center space-x-2">
                    <label className="font-medium" htmlFor="Year">Select:</label>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        styles={customStyles}
                        isMulti
                        className="min-w-52"
                    />
                </div>

                <button className="rounded-full p-2 mx-2 border border-black" type="submit">
                    <FaSearch />
                </button>

                <button type="button" className="rounded-full p-2 mx-2 border border-black" onClick={handleReset}>
                    <VscDebugStepBack />
                </button>

                {requestHistory.length > 1 && (
                    <button type="button" className="rounded-full p-2 mx-2 border border-black" onClick={handleBack}>
                        <IoMdArrowRoundBack />
                    </button>
                )}
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
                            {selectedOptionFields && selectedOptionFields.map((option) => (
                                <th key={option.label} className="p-2 border border-black text-blue-700">
                                    {option.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="border border-black">
                        {
                            loading ?
                                <tr key="loading">
                                    <td colSpan={13} className="p-4 text-2xl">
                                        <LoadingIcons.Bars fill="black" className="h-10 w-full place-self-center" />
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
                                        {selectedOptionFields && selectedOptionFields.map((option) => (
                                            <td key={option.value} className="p-2 border border-black">
                                                {element[option.value]}
                                            </td>
                                        ))}
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
                    <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPosts={responseData.length} postsPerPage={postsPerPage} resetPageNumber={resetPageNumber} setResetPageNumber={setResetPageNumber} />
                }

            </section>
        </div>
    );
}