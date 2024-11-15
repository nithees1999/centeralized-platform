import { FaSearch, FaEdit } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PaginationButtons from "./PaginationButtons";
import LoadingIcons from 'react-loading-icons'
import OrigenateModal from "./OrigenateModal";
import UploadExcelModal from "./UploadExcelModal";

export default function Origenate() {
    const [searchParams, setSearchParams] = useState({
        Env: '',
        Security_Profile: ''
    });
    const [loading, setLoading] = useState(false);
    const [envTypes, setEnvTypes] = useState([]);
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
    const updateOrigenateRecord = "/api/updateOrigenateRecord"

    //Modal
    const [openUpload, setOpenUpload] = useState(false);

    const onOpenModalUpload = (element) => {
        setOpenUpload(true)
    }
    const onCloseModalUpload = () => {
        setOpenUpload(false);
        // setUpdateResponse("")
    }

    //Modal
    const [open, setOpen] = useState(false);
    const [updateResponse, setUpdateResponse] = useState("");
    const [creds, setCreds] = useState({
        User_ID: "",
        Password: "",
        AdminPassword: ""
    });
    const customAdminPassword = "12345"

    const onOpenModal = (element) => {
        setOpen(true)
        setCreds({
            User_ID: element.User_ID,
            Password: element.Password,
            AdminPassword: ""
        })
    }
    const onCloseModal = () => {
        setOpen(false);
        setUpdateResponse("")
    }

    const modalInputChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    const handlePasswordUpdate = async (creds) => {
        if (creds.AdminPassword && creds.AdminPassword === customAdminPassword) {
            const Response = await axios.post(portUrl + updateOrigenateRecord, {
                id: creds.User_ID,
                data: creds.Password
            });
            setUpdateResponse(Response.data)
            fetchOrigenateDetails()
        } else {
            setUpdateResponse("Admin password error")
        }
    }


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
        const fetchEnvTypes = async () => {
            const response = await axios.get("http://localhost:8080/api/getEnvTypes")
            setEnvTypes(response.data)
        }
        fetchEnvTypes()
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
            <UploadExcelModal open={openUpload} onCloseModal={onCloseModalUpload} />
            {/* <h1 className="text-center text-xl font-bold p-2 text-blue-900  ">Origenate Details</h1> */}
            <div class="flex justify-between items-center w-full">
                <span class="text-xl font-bold text-blue-900 mx-auto">Origenate Details</span>
                <button class="p-2 bg-blue-900 text-white rounded-xl" onClick={() => onOpenModalUpload()}>Upload</button>
            </div>
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
                        {envTypes.map((Envtype, index) => (
                            <option key={index} value={Envtype}>{Envtype}</option>
                        ))}
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
                <OrigenateModal open={open} onCloseModal={onCloseModal} creds={creds} modalInputChange={modalInputChange} handlePasswordUpdate={() => handlePasswordUpdate(creds)} updateResponse={updateResponse} />
                <table className="w-full">
                    <thead className="border border-black ">
                        <tr>
                            <th className="p-4 border border-black text-blue-900">User Id</th>
                            <th className="p-4 border border-black text-blue-900">Password</th>
                            <th className="p-4 border border-black text-blue-900">Team</th>
                            <th className="p-4 border border-black text-blue-900">Security Profile</th>
                            <th className="p-4 border border-black text-blue-900">ENV</th>
                            <th className="p-4 border border-black text-blue-900">EDIT</th>
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
                                        <td className="p-2 border border-black text-center">
                                            <FaEdit className="inline-block cursor-pointer" onClick={() => onOpenModal(element)} />
                                        </td>
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