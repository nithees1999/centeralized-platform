import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";

export default function VinGenerator() {
    //state for initial data
    const [mydata, setMydata] = useState([]);
    const [searchParams, setSearchParams] = useState({
        VINType: '',
        VIN: '',
        Model: '',
        Make: '',
        Year: ''
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
                    <label className="px-1 font-medium " htmlFor="VINType">VIN type:</label>
                    <select
                        className="border border-black rounded p-1 w-32 "
                        name="VINType"
                        id="VINType"
                        value={searchParams.VINType}
                        onChange={handleChange}
                    >
                        <option value="">NA</option>
                        <option value="VIN">VIN</option>
                        <option value="AutoVIN">Auto VIN</option>
                    </select>
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="VIN">VIN Number:</label>
                    <input
                        className="border border-black rounded p-1 w-44 "
                        type="text"
                        name="VIN"
                        value={searchParams.VIN}
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
                            <th className="p-4 border border-black text-blue-700">VIN Type</th>
                            <th className="p-4 border border-black text-blue-700">VIN Number</th>
                            <th className="p-4 border border-black text-blue-700">Model</th>
                            <th className="p-4 border border-black text-blue-700">Make</th>
                            <th className="p-4 border border-black text-blue-700">Year</th>
                        </tr>
                    </thead>

                    <tbody className="border border-black">
                        {
                            mydata.length > 0 ?
                                mydata.map((element, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border border-black">{element.VINType}</td>
                                        <td className="p-2 border border-black">{element.VIN}</td>
                                        <td className="p-2 border border-black">{element.Model}</td>
                                        <td className="p-2 border border-black">{element.Make}</td>
                                        <td className="p-2 border border-black">{element.Year}</td>
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
                                                <td className="p-2 border border-black">{element.VINType}</td>
                                                <td className="p-2 border border-black">{element.VIN}</td>
                                                <td className="p-2 border border-black">{element.Model}</td>
                                                <td className="p-2 border border-black">{element.Make}</td>
                                                <td className="p-2 border border-black">{element.Year}</td>
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