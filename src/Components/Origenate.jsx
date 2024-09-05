import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";

export default function Origenate() {
    //state for initial data
    const [origenateData, setOrigenateData] = useState([]);
    const [searchParams, setSearchParams] = useState({
        Env: '',
        Security_Profile: ''
    });

    const [responseData, setResponseData] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        let searchParamsLength = Object.values(searchParams).filter(value => value !== null && value !== undefined && value !== "").length
        if (searchParamsLength > 0) {
            setOrigenateData([])
            try {
                const response = await fetch('http://localhost:8080/api/OrigenateFilter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(searchParams),
                });
                const data = await response.json();
                setResponseData(data);
            } catch (error) {
                console.error(error);
            }
        } else {
            //No values provided and exicuted the search feature 
            setResponseData([])
        }
    };


    useEffect(() => {
        //fetch only for demo data in the page
        fetch("http://localhost:8080/api/fetchOrigenateDetails")
            .then(res => res.json())
            .then(data => setOrigenateData(data))
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
                            origenateData.length > 0 ?
                            origenateData.map((element, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border border-black">{element.User_ID}</td>
                                        <td className="p-2 border border-black">{element.Password}</td>
                                        <td className="p-2 border border-black">{element.Team}</td>
                                        <td className="p-2 border border-black">{element.Security_Profile}</td>
                                        <td className="p-2 border border-black">{element.Env}</td>
                                    </tr>
                                ))
                                :
                                responseData.message === "No data available" ?
                                    <tr key="no-data">
                                        <td colSpan={5} className="p-4 text-center w-full">
                                            No data available
                                        </td>
                                    </tr>
                                    :
                                    responseData.length > 0 ?
                                        responseData.map((element, index) => (
                                            <tr key={index} className="text-center">
                                                <td className="p-2 border border-black">{element.User_ID}</td>
                                                <td className="p-2 border border-black">{element.Password}</td>
                                                <td className="p-2 border border-black">{element.Team}</td>
                                                <td className="p-2 border border-black">{element.Security_Profile}</td>
                                                <td className="p-2 border border-black">{element.Env}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr key="no-data">
                                            <td colSpan={5} className="p-4 text-center w-full">
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