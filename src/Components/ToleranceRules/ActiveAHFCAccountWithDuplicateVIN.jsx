import React, { useEffect, useState } from 'react';
import axios from "axios";
export default function ActiveAHFCAccountWithDuplicateVIN() {
    const [tableData, setTableData] = useState([]);
    const [columnNames, setColumnNames] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/ActiveAHFCAccountWithDuplicateVINTable");
                const responseData = response.data;
                setTableData(responseData);
                setColumnNames(Object.keys(responseData[0]));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">ToleranceRules</h1>
            <h1 className='text-center text-xl font-bold p-2 text-blue-700'>Active AHFC Account With Duplicate VIN</h1>
            <section style={{ overflowX: 'auto' }} className='p-4 text-center'>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            {columnNames.map((item, index) => (
                                <th key={index} className={`px-4 py-2 border text-blue-700 ${item === 'Description' ? 'min-w-80' : item === 'Rule Detail' ? 'min-w-96' : ''}`}>
                                    {item}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((tableItem, index) => (
                            <tr key={index}>
                                {columnNames.map((columnName, index) => (
                                    <td className="px-4 py-2 border text-black" key={index}>
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