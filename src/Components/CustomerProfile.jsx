import { FaSearch, FaUndo } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
const CustomerProfile = () => {
    const [formState, setFormState] = useState({
        selectedState: '',
        ficoScore: '',
        selectedTier: '',
        selectedScoreCardType: '',
    });
    const [states, setStates] = useState([]);
    const [tiers, setTiers] = useState([]);
    const [scoreCardTypes, setScoreCardTypes] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customerDataResponse, scoreCardTypesResponse, statesResponse, tiersResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/customerprofile'),
                    axios.get('http://localhost:8080/api/getScoreCardTypes'),
                    axios.get('http://localhost:8080/api/getStates'),
                    axios.get('http://localhost:8080/api/getTier'),
                ]);
                setFilteredData(customerDataResponse.data);
                setScoreCardTypes(scoreCardTypesResponse.data);
                setStates(statesResponse.data);
                setTiers(tiersResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/customerprofile', {
                State: formState.selectedState,
                FicoScore: formState.ficoScore,
                Tier: formState.selectedTier,
                ScoreCardType: formState.selectedScoreCardType
            });
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleReset = async () => {
        setFormState({
            selectedState: '',
            ficoScore: '',
            selectedTier: '',
            selectedScoreCardType: '',
        });
        try {
            const response = await axios.get('http://localhost:8080/api/customerprofile');
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const formatDOB = (dob) => {
        const date = new Date(dob);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <div className="p-2">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">CUSTOMER PROFILE</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <div>
                    <label className="px-1 font-medium" htmlFor="State">State:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="selectedState"
                        value={formState.selectedState}
                        onChange={handleInputChange}
                    >
                        <option value="">Select State</option>
                        {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Tier">Tier:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="selectedTier"
                        value={formState.selectedTier}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Tier</option>
                        {tiers.map((tier, index) => (
                            <option key={index} value={tier}>{tier}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="ficoScore">FICO_Score:</label>
                    <input
                        className="border border-black rounded p-1 w-32"
                        type="number"
                        name="ficoScore"
                        value={formState.ficoScore}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="selectedScoreCardType">ScoreCard:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="selectedScoreCardType"
                        value={formState.selectedScoreCardType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select ScoreCard</option>
                        {scoreCardTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
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
                {filteredData.length === 0 && !loading && (<div className="flex justify-center items-center min-h-full">No data available</div>)}
                {filteredData.length > 0 && (
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
                            {filteredData.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="p-2 border border-black">{item.First_Name}</td>
                                    <td className="p-2 border border-black">{item.Last_Name}</td>
                                    <td className="p-2 border border-black" style={{ whiteSpace: 'nowrap' }}>{formatDOB(item.DOB)}</td>
                                    <td className="p-2 border border-black">{item.House}</td>
                                    <td className="p-2 border border-black">{item.Street_Name}</td>
                                    <td className="p-2 border border-black">{item.Street_Type}</td>
                                    <td className="p-2 border border-black">{item.City}</td>
                                    <td className="p-2 border border-black">{item.State}</td>
                                    <td className="p-2 border border-black">{item["Zip Code"]}</td>
                                    <td className="p-2 border border-black">{item.SSN}</td>
                                    <td className="p-2 border border-black">{item.FICO_Score}</td>
                                    <td className="p-2 border border-black">{item.Tier}</td>
                                    <td className="p-2 border border-black">{item.ScoreCard_Type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
};
export default CustomerProfile;