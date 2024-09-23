import React, { useState } from 'react';
import axios from "axios";
import DecisionRulesData from "./DecisionRulesData.json"

export default function DecisionRules(){
    const [selectedOption, setSelectedOption] = useState('');
    const [tableData, setTableData] = useState([]);
    const [columnNames, setColumnNames] = useState([]);
    const options = DecisionRulesData;
    
    // API call URLs
    const portUrl = "http://localhost:8080";
    const fetchTable = `/api/rulesTable/${selectedOption}`;

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleButtonClick = async (event) => {
        event.preventDefault();
        if (selectedOption) {
            try {
                const response = await axios.get(`${portUrl + fetchTable}`);
                const responseData = response.data;
                setTableData(responseData);
                setColumnNames(Object.keys(responseData[0]));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
            console.log("You did not select anything");
        }
    };

    const handleReset = () => {
        setTableData([]);
        setColumnNames([]);
        setSelectedOption('')
    }

    return (
        <>
            <h1 className='p-2 text-2xl font-bold text-center'>Rules Engine</h1>
            <form className="p-4">
                <label className="block text-gray-700 mb-2 mx-2 font-semibold" htmlFor="dropdown">
                    Select Rule:
                </label>
                <select
                    id="dropdown"
                    value={selectedOption}
                    onChange={handleChange}
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {selectedOption && (
                    <p className="mt-2 text-gray-700">
                        Selected Table: {selectedOption}
                    </p>
                )}
                <button
                    onClick={handleButtonClick}
                    className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Submit
                </button>
                <button
                    onClick={handleReset} type='button'
                    className="mt-4 mx-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Reset
                </button>
            </form>

            <section style={{ overflowX: 'auto' }} className='p-4 text-center'>
                <table className="min-w-full bg-white border border-gray-300" >
                    <thead>
                        <tr className="bg-gray-100">
                            {columnNames.map((item, index) => (
                                <th key={index} className={`px-4 py-2 border ${item === 'Description' ? 'min-w-80' : item === 'When to Use or Rule Detail' ? 'min-w-96' : ''}`}>
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((tableItem, index) => (
                            <tr key={index}>
                                {columnNames.map((columnName, index) => (
                                    <td className="px-4 py-2 border" key={index}>
                                        {tableItem[columnName]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};
