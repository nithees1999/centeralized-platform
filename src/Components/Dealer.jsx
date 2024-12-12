import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginationButtons from "./PaginationButtons";
import LoadingIcons from 'react-loading-icons'
import UploadExcelModal from "./UploadExcelModal";

export default function Dealer() {
    const [searchParams, setSearchParams] = useState({
        State: '',
        Brand: '',
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
    const fetchDealerDetailsUrl = "/api/fetchDealerDetails"
    const filterDealerDetailsUrl = "/api/DealerFilter"

    //Modal
    const [open, setOpen] = useState(false);

    const onOpenModal = (element) => {
        setOpen(true)
    }
    const onCloseModal = () => {
        setOpen(false);
        // setUpdateResponse("")
    }

    const fetchDealerDetails = async () => {
        setLoading(true)
        const response = await axios.get(`${portUrl + fetchDealerDetailsUrl}`)
        setResponseData(response.data)
        setLoading(false)
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setResetPage(true)
        //checking if we have enough parameters for requesting from DB
        let searchParamsLength = Object.values(searchParams).filter(value => value !== null && value !== undefined && value !== "").length
        if (searchParamsLength > 0) {
            try {
                setLoading(true)
                const response = await axios.post(`${portUrl + filterDealerDetailsUrl}`, searchParams);
                setResponseData(response.data)
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        } else {
            fetchDealerDetails()
        }
    };

    useEffect(() => {
        fetchDealerDetails()
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
            <UploadExcelModal open={open} onCloseModal={onCloseModal} />

            {/* <h1 className="text-center text-xl font-bold p-2 text-blue-900">Dealer Details</h1> */}
            <div className="flex justify-between items-center w-full">
                <span className="text-xl font-bold text-blue-900 mx-auto">Dealer Details</span>
                <button className="p-2 bg-blue-900 text-white rounded-xl"onClick={() => onOpenModal()}>Upload</button>
            </div>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap "
                onSubmit={handleSearch}
            >

                <section>
                    <label className="px-1 font-medium " htmlFor="state">State:</label>
                    <input
                        className="border border-black rounded p-1 w-32 "
                        name="State"
                        id="State"
                        value={searchParams.State}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="brand">Brand:</label>
                    <input
                        className="border border-black rounded p-1 w-44 "
                        type="text"
                        name="Brand"
                        value={searchParams.Brand}
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
                            <th className="p-4 border border-black text-blue-900">State</th>
                            <th className="p-4 border border-black text-blue-900">Brand</th>
                            <th className="p-4 border border-black text-blue-900">Dealer Number</th>
                            <th className="p-4 border border-black text-blue-900">Userid</th>
                            <th className="p-4 border border-black text-blue-900">Password</th>
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
                                        <td className="p-2 border border-black">{element.State}</td>
                                        <td className="p-2 border border-black">{element.Brand}</td>
                                        <td className="p-2 border border-black">{element.DealerNumber}</td>
                                        <td className="p-2 border border-black">{element.UserID}</td>
                                        <td className="p-2 border border-black">{element.Password}</td>
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