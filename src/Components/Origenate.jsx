import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginationButtons from "./PaginationButtons";
import LoadingIcons from 'react-loading-icons'

export default function Origenate() {
    const [searchParams, setSearchParams] = useState({
        Env: '',
        Security_Profile: ''
    });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const [resetPage, setResetPage] = useState(false);
    const [responseData, setResponseData] = useState([]);
    let responseDataPosts;
    if (responseData && responseData.length > 0) {
        responseDataPosts = responseData.slice(firstPostIndex, lastPostIndex)
    }

    //api call URLs
    const portUrl = "http://localhost:8080"
    const fetchOrigenateDetailsUrl = "/api/fetchOrigenateDetails"
    const filterOrigenateDetailsUrl = "/api/OrigenateFilter"

    const fetchOrigenateDetails = async () => {
        setLoading(true)
        const response = await axios.get(`${portUrl + fetchOrigenateDetailsUrl}`)
        setResponseData(response.data)
        setLoading(false)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setResetPage(true)
        let searchParamsLength = Object.values(searchParams).filter(value => value !== null && value !== undefined && value !== "").length
        if (searchParamsLength > 0) {
            try {
                setLoading(true)
                const response = await axios.post(`${portUrl + filterOrigenateDetailsUrl}`, searchParams);
                setResponseData(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        } else {
            fetchOrigenateDetails()
        }
    };

    useEffect(() => {
        fetchOrigenateDetails()
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
            <h1 className="text-center text-xl font-bold p-2 text-blue-700  ">Origenate Details</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap "
                onSubmit={handleSearch}
            >

                <section>
                    <label className="px-1 font-medium " htmlFor="Env">ENV type:</label>
                    <select
                        className="border border-black rounded p-1 w-32 "
                        name="Env"
                        id="Env"
                        value={searchParams.Env}
                        onChange={handleChange}
                    >
                        <option value="">NA</option>
                        <option value="STG">STG</option>
                        <option value="SIN">SIN</option>
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="Security_Profile">Security Profile:</label>
                    <input
                        className="border border-black rounded p-1 w-44 "
                        type="text"
                        name="Security_Profile"
                        id="Security_Profile"
                        value={searchParams.Security_Profile}
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
                            <th className="p-4 border border-black text-blue-700">User Id</th>
                            <th className="p-4 border border-black text-blue-700">Password</th>
                            <th className="p-4 border border-black text-blue-700">Team</th>
                            <th className="p-4 border border-black text-blue-700">Security Profile</th>
                            <th className="p-4 border border-black text-blue-700">ENV</th>
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
                                        <td className="p-2 border border-black">{element.User_ID}</td>
                                        <td className="p-2 border border-black">{element.Password}</td>
                                        <td className="p-2 border border-black">{element.Team}</td>
                                        <td className="p-2 border border-black">{element.Security_Profile}</td>
                                        <td className="p-2 border border-black">{element.Env}</td>
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