import React, { useEffect, useState } from 'react';
import axios from "axios";
export default function InvalidExcessiveWearAndUse() {
    const [tableData, setTableData] = useState([]);
    const [columnNames, setColumnNames] = useState([]);
    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/invalidExcessiveWearAndUseTable");
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
            <h1 className='p-2 text-2xl font-bold text-center'>Invalid Excessive Wear And Use</h1>
            <section style={{ overflowX: 'auto' }} className='p-4 text-center'>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            {columnNames.map((item, index) => (
                                <th key={index} className={`px-4 py-2 border ${item === 'Description' ? 'min-w-80' : item === 'Rule Detail' ? 'min-w-96' : ''}`}>
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