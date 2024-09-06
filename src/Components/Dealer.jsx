import { FaSearch } from "react-icons/fa";
import React, { useEffect, useState } from "react";

export default function Dealer() {
    //state for initial data
    const [dealerData, setDealerData] = useState([]);
    const [searchParams, setSearchParams] = useState({
        state: '',
        brand: '',
    });

    const [responseData, setResponseData] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        let searchParamsLength = Object.values(searchParams).filter(value => value !== null && value !== undefined && value !== "").length
        if (searchParamsLength > 0) {
            setDealerData([])
            try {
                const response = await fetch('http://localhost:8080/api/DealerFilter', {
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
        fetch("http://localhost:8080/api/fetchDealerDetails")
            .then(res => res.json())
            .then(data => setDealerData(data))
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
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">Dealer Details</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap "
                onSubmit={handleSearch}
            >

                <section>
                    <label className="px-1 font-medium " htmlFor="state">State:</label>
                    <input
                        className="border border-black rounded p-1 w-32 "
                        name="state"
                        id="state"
                        value={searchParams.state}
                        onChange={handleChange}
                    />
                </section>

                <section>
                    <label className="px-1 font-medium " htmlFor="brand">Brand:</label>
                    <input
                        className="border border-black rounded p-1 w-44 "
                        type="text"
                        name="brand"
                        value={searchParams.brand}
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
                            <th className="p-4 border border-black text-blue-700">State</th>
                            <th className="p-4 border border-black text-blue-700">Brand</th>
                            <th className="p-4 border border-black text-blue-700">Dealer Number</th>
                            <th className="p-4 border border-black text-blue-700">Userid</th>
                            <th className="p-4 border border-black text-blue-700">Password</th>
                        </tr>
                    </thead>

                    <tbody className="border border-black">
                        {
                            dealerData.length > 0 ?
                            dealerData.map((element, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border border-black">{element.state}</td>
                                        <td className="p-2 border border-black">{element.brand}</td>
                                        <td className="p-2 border border-black">{element.dealernumber}</td>
                                        <td className="p-2 border border-black">{element.userid}</td>
                                        <td className="p-2 border border-black">{element.password}</td>
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
                                                <td className="p-2 border border-black">{element.state}</td>
                                                <td className="p-2 border border-black">{element.brand}</td>
                                                <td className="p-2 border border-black">{element.dealernumber}</td>
                                                <td className="p-2 border border-black">{element.userid}</td>
                                                <td className="p-2 border border-black">{element.password}</td>
                                            </tr>
                                        ))
                                        :
                                        <tr key="no-data">
                                            <td colSpan={5} className="p-4 text-center w-full">
                                                Check values / Provide values for searching
                                            </td>
                                        </tr>
                            // console.log(mydata)
                        }
                    </tbody>

                </table>
            </section>
        </div>
    );
}