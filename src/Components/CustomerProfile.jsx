import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch, FaUndo } from 'react-icons/fa';
const CustomerProfile = () => {
    const [stateData, setStateData] = useState({
        states: [],
        tiers: [],
        scorecards: [],
        data: [],
        filteredData: [],
        selectedState: '',
        ficoScore: '',
        selectedTier: '',
        selectedScorecard: '',
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [allData, statesResponse, tiersResponse, scorecardResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/customerprofile'),
                    axios.get('http://localhost:8080/api/getApprovalStates'),
                    axios.get('http://localhost:8080/api/getApprovalTier'),
                    axios.get('http://localhost:8080/api/getApprovalScorecard')
                ]);
                setStateData(prevState => ({
                    ...prevState,
                    states: statesResponse.data,
                    tiers: tiersResponse.data,
                    scorecard: scorecardResponse.data,
                    data: allData.data,
                    filteredData: allData.data
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/customerprofile', {
                State: stateData.selectedState,
                FicoScore: stateData.ficoScore,
                Tier: stateData.selectedTier,
                Scorecard: stateData.selectedScorecard,
                
            });
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
            selectedState: '',
            ficoScore: '',
            selectedTier: '',
            selectedScorecard:''
        }));
    };
    const formatDOB = (dob) => {
        const date = new Date(dob);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <div className="p-2">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">Customer Profile</h1>
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
                        value={stateData.selectedState}
                        onChange={(e) => setStateData(prevState => ({ ...prevState, selectedState: e.target.value }))}
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
                        value={stateData.selectedTier}
                        onChange={(e) => setStateData(prevState => ({ ...prevState, selectedTier: e.target.value }))}
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
                        value={stateData.ficoScore}
                        onChange={(e) => setStateData(prevState => ({ ...prevState, ficoScore: e.target.value }))}
                    />
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Scorecard">Scorecard:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Scorecard"
                        id="Scorecard"
                        value={stateData.selectedScorecard}
                        onChange={(e) => setStateData(prevState => ({ ...prevState, selectedScorecard: e.target.value }))}
                    >
                        <option value="">Select Scorcard</option>
                        {stateData.scorecards.map((scorecard, index) => (
                            <option key={index} value={scorecard}>{scorecard}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="rounded-full p-2 mx-2 border border-black">
                    <FaSearch />
                </button>
                <button type="button" onClick={handleReset} className="rounded-full p-2 mx-2 border border-black">
                    <FaUndo />
                </button>
                {loading && <div>Loading...</div>}
            </form>
            <section className="min-h-screen py-8 px-4 m-2 border border-black rounded-md">
                
                    <table className="w-full">
                        <thead className="border border-black">
                            <tr>
                            <th className="p-4 border border-black text-blue-700">First Name</th>
                            <th className="p-4 border border-black text-blue-700">Last Name</th>
                            <th className="p-4 border border-black text-blue-700">DOB</th>
                            <th className="p-4 border border-black text-blue-700">House</th>
                            <th className="p-4 border border-black text-blue-700">Street Name</th>
                            <th className="p-4 border border-black text-blue-700">Street Type</th>
                            <th className="p-4 border border-black text-blue-700">City</th>
                            <th className="p-4 border border-black text-blue-700">State</th>
                            <th className="p-4 border border-black text-blue-700">Zip Code</th>
                            <th className="p-4 border border-black text-blue-700">SSN</th>
                            <th className="p-4 border border-black text-blue-700">FICO Score</th>
                            <th className="p-4 border border-black text-blue-700">Tier</th>
                            <th className="p-4 border border-black text-blue-700">ScoreCard</th>
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
                                    <td className="p-2 border border-black">{item["First Name"]}</td>
                                <td className="p-2 border border-black">{item["Last Name"]}</td>
                                <td className="p-2 border border-black" style={{ whiteSpace:'nowrap'}}>{formatDOB(item.DOB)}</td>
                                <td className="p-2 border border-black">{item.House}</td>
                                <td className="p-2 border border-black">{item["Street Name"]}</td>
                                <td className="p-2 border border-black">{item["Street Type"]}</td>
                                <td className="p-2 border border-black">{item.City}</td>
                                <td className="p-2 border border-black">{item.State}</td>
                                <td className="p-2 border border-black">{item["Zip Code"]}</td>
                                <td className="p-2 border border-black">{item.SSN}</td>
                                <td className="p-2 border border-black">{item["FICO Score"]}</td>
                                <td className="p-2 border border-black">{item.Tier}</td>
                                <td className="p-2 border border-black">{item["ScoreCard Type"]}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                
            </section>
        </div>
    );
};
export default CustomerProfile;