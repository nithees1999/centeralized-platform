import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import links from "../../Utils/links"

const CommonTableLayout = ({ tableName }) => {
    const { portUrl, fetchToleranceTable } = links
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when the component mounts or tableName changes
    useEffect(() => {
        if (!tableName) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`${portUrl}${fetchToleranceTable}/${tableName}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data for table: ${tableName}`);
                }

                const data = await response.json();
                if (data.length > 0) {
                    setColumns(Object.keys(data[0])); // Extract column names from the first row
                }
                setTableData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tableName, portUrl, fetchToleranceTable]);

    // Check for specific column names
    const isWideColumn = (column) => {
        return column === 'Rule_Details_Logic' || column === 'Open_Issues_Questions';
    };

    return (
        <div className="overflow-x-auto p-4">
            {loading ? (
                <p>Loading data for table: {tableName}...</p>
            ) : error ? (
                <p className="text-red-600">Error: {error}</p>
            ) : tableData.length === 0 ? (
                <p>No data available for table: {tableName}</p>
            ) : (
                <table className="min-w-full table-fixed border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    className={`border border-gray-300 px-4 py-2 bg-gray-100 font-bold ${isWideColumn(col) ? 'w-1/4' : 'w-1/6'}`}
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td
                                        key={col}
                                        className={`border border-gray-300 px-4 py-2 text-center ${isWideColumn(col) ? 'min-w-80' : 'w-1/6'}`}
                                    >
                                        {row[col] !== null ? row[col].toString() : ''}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// PropTypes for the component
CommonTableLayout.propTypes = {
    tableName: PropTypes.string.isRequired, // Table name to fetch from API
    apiEndpoint: PropTypes.string.isRequired, // API base URL for fetching table data
};

export default CommonTableLayout;