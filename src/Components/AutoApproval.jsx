import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaHome } from 'react-icons/fa';
const AutoApproval = () => {
    const [stateData, setStateData] = useState({
        states: [],
        tiers: [],
        data: [],
        filteredData: [],
        State: '',
        FICO_Score: '',
        Tier: '',
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allData, statesResponse, tiersResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/autoapproval'),
                    axios.get('http://localhost:8080/api/getApprovalStates'),
                    axios.get('http://localhost:8080/api/getApprovalTier')
                ]);
                setStateData(prevState => ({
                    ...prevState,
                    states: statesResponse.data,
                    tiers: tiersResponse.data,
                    data: allData.data,
                    filteredData: allData.data
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStateData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/autoapproval',stateData);
                
            setStateData(prevState => ({ ...prevState, filteredData: response.data }));
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
        setLoading(false);
    };
    const handleReset = () => {
        setStateData(prevState => ({
            ...prevState,
            filteredData: prevState.data,
            State: '',
            FICO_Score: '',
            Tier: ''
        }));
    };
    return (
        <div className="p-2">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">AUTO APPROVAL</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <div>
                    <label className="px-1 font-medium" htmlFor="State">State:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="State"
                        id="State"
                        value={stateData.State}
                        onChange={handleChange}
                    >
                        <option value="">Select State</option>
                        {stateData.states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Tier">Tier:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Tier"
                        id="Tier"
                        value={stateData.Tier}
                        onChange={handleChange}
                    >
                        <option value="">Select Tier</option>
                        {stateData.tiers.map((tier, index) => (
                            <option key={index} value={tier}>{tier}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="fico-score">FICO Score:</label>
                    <input
                        className="border border-black rounded p-1 w-32"
                        type="number"
                        name="FICO_Score"
                        id="fico-score"
                        value={stateData.FICO_Score}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="rounded-full p-2 mx-2 border border-black">
                    <FaSearch />
                </button>
                <button type="button" onClick={handleReset} className="rounded-full p-2 mx-2 border border-black">
                    <FaHome />
                </button>
                {loading && <div>Loading...</div>}
            </form>
            <section className="min-h-screen py-8 px-4 m-2 border border-black rounded-md">
                <div style={{ overflowX: 'auto' }}>
                    <table className="w-full" style={{ tableLayout: 'fixed' }}>
                        <thead className="border border-black">
                            <tr>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '120px' }}>Last Name</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '120px' }}>First Name</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '120px' }}>Middle Name</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '80px' }}>Prefix</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '80px' }}>Suffix</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '120px' }}>House</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '100px' }}>Direction</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '150px' }}>Street Name</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '100px' }}>Post Dir</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '100px' }}>Street Type</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '80px' }}>Apt</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '120px' }}>City</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '100px' }}>State</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '120px' }}>Zip Code</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '120px' }}>SSN</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '120px' }}>FICO Score</th>
                                <th className="p-4 border border-black text-blue-700" style={{ width: '80px' }}>Tier</th>
                            </tr>
                        </thead>
                        <tbody className="border border-black">
                            {stateData.filteredData.length === 0 && !loading ? (
                                <tr>
                                    <td colSpan={17} className="p-4 text-center">No data available</td>
                                </tr>
                            ) : (
                                stateData.filteredData.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="p-2 border border-black">{item.Last_Name}</td>
                                        <td className="p-2 border border-black">{item.First_Name}</td>
                                        <td className="p-2 border border-black">{item.Middle_Name}</td>
                                        <td className="p-2 border border-black">{item.Prefix}</td>
                                        <td className="p-2 border border-black">{item.Suffix}</td>
                                        <td className="p-2 border border-black">{item.House}</td>
                                        <td className="p-2 border border-black">{item.Direction}</td>
                                        <td className="p-2 border border-black">{item.Street_Name}</td>
                                        <td className="p-2 border border-black">{item.Post_Dir}</td>
                                        <td className="p-2 border border-black">{item.Street_Type}</td>
                                        <td className="p-2 border border-black">{item.Apt}</td>
                                        <td className="p-2 border border-black">{item.City}</td>
                                        <td className="p-2 border border-black">{item.State}</td>
                                        <td className="p-2 border border-black">{item.Zip_Code}</td>
                                        <td className="p-2 border border-black">{item.SSN}</td>
                                        <td className="p-2 border border-black">{item.FICO_Score}</td>
                                        <td className="p-2 border border-black">{item.Tier}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
export default AutoApproval;