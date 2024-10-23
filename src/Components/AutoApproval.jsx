import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaHome } from 'react-icons/fa';
import LoadingIcons from 'react-loading-icons'
import Select from 'react-select';
import PaginationButtons from "./PaginationButtons";

const AutoApproval = () => {
    const [stateData, setStateData] = useState({
        states: [],
        tiers: [],
        State: '',
        FICO_Score: '',
        Tier: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const [loading, setLoading] = useState(false);
    const [resetPageNumber, setResetPageNumber] = useState(false);


    const [responseData, setResponseData] = useState([]);
    let responseDataPosts;
    if (responseData && responseData.length > 0) {
        responseDataPosts = responseData.slice(firstPostIndex, lastPostIndex)
    }

    //api call URLs
    const portUrl = "http://localhost:8080"
    const fetchAutoApprovalUrl = "/api/autoapproval"
    const filterAutoApprovalUrl = "/api/autoApprovalFilter"
    const getApprovalStatesUrl = "/api/getApprovalStates"
    const getApprovalTiersUrl = "/api/getApprovalTiers"

    //dropdown multiSelect
    const options = [
        { value: 'Middle_Name', label: 'Middle Name' },
        { value: 'Suffix', label: 'Suffix' },
        { value: 'House', label: 'House' },
        { value: 'Direction', label: 'Direction' },
        { value: 'Street_Name', label: 'Street Name' },
        { value: 'Street_Type', label: 'Street Type' },
        { value: 'Post_Dir', label: 'Post Dir' },
        { value: 'Apt', label: 'Apt' },
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

    const fetchAutoApprovalDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(portUrl + fetchAutoApprovalUrl);
            setResponseData(response.data); 
        } catch (error) {
            console.error("Error fetching auto approval data:", error);
        }
        setLoading(false);
    };
     

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [statesResponse, tiersResponse] = await Promise.all([
                    axios.get(portUrl + getApprovalStatesUrl),
                    axios.get(portUrl + getApprovalTiersUrl)
                ]);
                setLoading(false);
                setStateData(prevState => ({
                    ...prevState,
                    states: statesResponse.data,
                    tiers: tiersResponse.data,
                }));
                fetchAutoApprovalDetails()
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setselectedOptionFields(selectedOption)
            const response = await axios.post(portUrl + filterAutoApprovalUrl, stateData);
            setResponseData(response.data);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
        setLoading(false);
    };

    const handleReset = () => {
        setStateData(prevState => ({
            ...prevState,
            State: '',
            Tier: '',
            FICO_Score: '',
        }));
        fetchAutoApprovalDetails()
    };

    return (
        <div className="p-2">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">AUTO APPROVAL</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <div>
                    <label className="px-1 font-medium" htmlFor="State">State:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="State"
                        id="State"
                        value={stateData.State}
                        onChange={handleChange}
                    >
                        <option value="">Select State</option>
                        {stateData.states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Tier">Tier:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Tier"
                        id="Tier"
                        value={stateData.Tier}
                        onChange={handleChange}
                    >
                        <option value="">Select Tier</option>
                        {stateData.tiers.map((tier, index) => (
                            <option key={index} value={tier}>{tier}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="fico-score">FICO Score:</label>
                    <input
                        className="border border-black rounded p-1 w-32"
                        type="number"
                        name="FICO_Score"
                        id="fico-score"
                        value={stateData.FICO_Score}
                        onChange={handleChange}
                    />
                </div>

                {/* columns dropdown */}
                <div className="flex items-center space-x-2">
                    <label className="font-medium" htmlFor="fico-score">Select:</label>
                    <Select
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        styles={customStyles}
                        isMulti
                        className="min-w-52"
                    />
                </div>

                <button type="submit" className="rounded-full p-2 mx-2 border border-black">
                    <FaSearch />
                </button>
                <button type="button" onClick={handleReset} className="rounded-full p-2 mx-2 border border-black">
                    <FaHome />
                </button>
            </form>
            <section className="min-h-screen py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr>
                                <th className="p-4 border border-black text-blue-700" >Last Name</th>
                                <th className="p-4 border border-black text-blue-700" >First Name</th>
                                <th className="p-4 border border-black text-blue-700" >City</th>
                                <th className="p-4 border border-black text-blue-700" >State</th>
                                <th className="p-4 border border-black text-blue-700" >Zip Code</th>
                                <th className="p-4 border border-black text-blue-700" >SSN</th>
                                <th className="p-4 border border-black text-blue-700" >FICO Score</th>
                                <th className="p-4 border border-black text-blue-700">Tier</th>
                                {selectedOptionFields && selectedOptionFields.map((option) => (
                                    <th key={option.label} className="p-2 border border-black text-blue-700">
                                        {[option.label]}
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
                                    responseData && responseData.length > 0 ? responseData.map((item, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="p-2 border border-black">{item.Last_Name}</td>
                                            <td className="p-2 border border-black">{item.First_Name}</td>
                                            <td className="p-2 border border-black">{item.City}</td>
                                            <td className="p-2 border border-black">{item.State}</td>
                                            <td className="p-2 border border-black">{item.Zip_Code}</td>
                                            <td className="p-2 border border-black">{item.SSN}</td>
                                            <td className="p-2 border border-black">{item.FICO_Score}</td>
                                            <td className="p-2 border border-black">{item.Tier}</td>
                                            {selectedOptionFields && selectedOptionFields.map((option) => (
                                                <td key={option.value} className="p-2 border border-black">
                                                    {item[option.value]}
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
                </div>
                {responseDataPosts && responseDataPosts.length > 0 &&
                    <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} totalPosts={responseData.length} postsPerPage={postsPerPage} resetPageNumber={resetPageNumber} setResetPageNumber={setResetPageNumber} />
                }

            </section>
        </div>
    );
};
export default AutoApproval;