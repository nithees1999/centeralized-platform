import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import links from "../../Utils/links";

const CommonTableLayout = ({ tableName, wideColumns }) => {
    const { portUrl, fetchToleranceTable } = links;
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                    setColumns(Object.keys(data[0]));
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
            return column === 'Rule_Details_Logic' || column === 'Open_Issues_Questions' || column === 'RuleDetailsLogic';
        };

    return (
        <div className="overflow-x-auto p-4">
            <section className="py-8 px-4 border border-black rounded-md">
                {loading ? (
                    <p>Loading data for table: {tableName}...</p>
                ) : error ? (
                    <p className="text-red-600">Error fetching data for <strong>{tableName}</strong>: {error}</p>
                ) : tableData.length === 0 ? (
                    <p>No data available for table: {tableName}</p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table className="w-full border-collapse">
                            <thead className="border border-black">
                                <tr className="text-blue-900">
                                    {columns.map((col) => (
                                        <th
                                            key={col}
                                            className={`text-center p-4 border border-black ${isWideColumn(col) ? 'min-w-96' : 'min-w-60'
                                                }`}
                                        >
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((col) => (
                                            <td
                                                key={col}
                                                className="text-center p-2 border border-black"
                                            >
                                                {row[col] !== null ? row[col].toString() : ''}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

CommonTableLayout.propTypes = {
    tableName: PropTypes.string.isRequired,
    wideColumns: PropTypes.arrayOf(PropTypes.string),
};


export default CommonTableLayout;