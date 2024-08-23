import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";

export default function VinGenerator() {
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

        try {
            const response = await fetch('http://localhost:8080/api/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(searchParams),
            });
            const data = await response.json();
            setResponseData(data);
            console.log(responseData);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetch("http://localhost:8080/api/fetchVinDetails")
            .then(res => res.json())
            .then(data => setMydata(data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="">
            <form
                className="conditionsNav p-2 m-2 border-2 border-black rounded-md flex justify-center items-center gap-2 flex-wrap"
                onSubmit={handleSearch}
            >

                <section>
                    <label  className="px-2" htmlFor="VINType">VIN type:</label>
                    <select
                        className="border-2 border-black rounded p-2"
                        name="VINType"
                        id="VINType"
                        value={searchParams.VINType}
                        onChange={handleChange}
                    >
                        {/* <option value="Null"></option> */}
                        <option value="">NA</option>
                        <option value="VIN">VIN</option>
                        <option value="AutoVIN">Auto VIN</option>
                    </select>
                </section>

                <section>
                    <label className="px-2" htmlFor="VIN">VIN Number:</label>
                    <input
                        className="border-2 border-black rounded p-2"
                        type="text"
                        name="VIN"
                        value={searchParams.VIN}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-2" htmlFor="Model">Model:</label>
                    <input
                        className="border-2 border-black rounded p-2"
                        type="text"
                        name="Model"
                        value={searchParams.Model}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-2" htmlFor="Make">Make:</label>
                    <input
                        className="border-2 border-black rounded p-2"
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
                    <label className="px-2" htmlFor="Year">Year:</label>
                    <input
                        className="border-2 border-black rounded p-2"
                        name="Year"
                        type="number"
                        min={1950}
                        max={2024}
                        step={1}
                        value={searchParams.Year}
                        onChange={handleChange}
                    />
                </section>

                <button className="rounded px-4 py-3 border-2 border-black" type="submit">
                    <FaSearch />
                </button>
            </form>
            <section className="min-h-screen py-8 px-4 m-2 border-2 border-black rounded-md">
                <table className="w-full">
                    <thead className="border-2 border-black">
                        <tr>
                            <th className="p-4 border-2 border-black">VIN Type</th>
                            <th className="p-4 border-2 border-black">VIN Number</th>
                            <th className="p-4 border-2 border-black">Model</th>
                            <th className="p-4 border-2 border-black">Make</th>
                            <th className="p-4 border-2 border-black">Year</th>
                        </tr>
                    </thead>

                    <tbody className="border-2 border-black">
                        {responseData
                            ? responseData.message === "No data available" ?
                                <tr key="no-data">
                                    <td colSpan={5} className="p-4 text-center w-full">
                                        No data available
                                    </td>
                                </tr>
                                :
                                responseData.map((element, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border-2 border-black">{element.VINType}</td>
                                        <td className="p-2 border-2 border-black">{element.VIN}</td>
                                        <td className="p-2 border-2 border-black">{element.Model}</td>
                                        <td className="p-2 border-2 border-black">{element.Make}</td>
                                        <td className="p-2 border-2 border-black">{element.Year}</td>
                                    </tr>
                                ))
                            : mydata.map((element, index) => (
                                <tr key={index} className="text-center">
                                    <td className="p-2 border-2 border-black">{element.VINType}</td>
                                    <td className="p-2 border-2 border-black">{element.VIN}</td>
                                    <td className="p-2 border-2 border-black">{element.Model}</td>
                                    <td className="p-2 border-2 border-black">{element.Make}</td>
                                    <td className="p-2 border-2 border-black">{element.Year}</td>
                                </tr>
                            ))}
                    </tbody>

                </table>
            </section>
        </div>
    );
}