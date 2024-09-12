import { FaSearch, FaHome } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
const CustomerProfile = () => {
    const [formState, setFormState] = useState({
        State: '',
        FICO_Score: '',
        Tier: '',
        ScoreCard_Type: '',
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
    const handleChange = (e) => {
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
            const response = await axios.post('http://localhost:8080/api/customerprofile', formState);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleReset = async () => {
        setFormState({
            State: '',
            FICO_Score: '',
            Tier: '',
            ScoreCard_Type: '',
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
                        name="State"
                        id="State"
                        value={formState.State}
                        onChange={handleChange}
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
                        name="Tier"
                        id="Tier"
                        value={formState.Tier}
                        onChange={handleChange}
                    >
                        <option value="">Select Tier</option>
                        {tiers.map((tier, index) => (
                            <option key={index} value={tier}>{tier}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="FICO_Score">FICO Score:</label>
                    <input
                        className="border border-black rounded p-1 w-32"
                        type="number"
                        name="FICO_Score"
                        id="FICO_Score"
                        value={formState.FICO_Score}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="ScoreCard_Type">ScoreCard:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="ScoreCard_Type"
                        id="ScoreCard_Type"
                        value={formState.ScoreCard_Type}
                        onChange={handleChange}
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
                    <FaHome />
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
                        {filteredData.length === 0 && !loading ? (
                            <tr>
                                <td colSpan="13" className="p-4 text-center">No data available</td>
                            </tr>
                        ) : (
                            filteredData.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td className="p-2 border border-black">{item.First_Name}</td>
                                    <td className="p-2 border border-black">{item.Last_Name}</td>
                                    <td className="p-2 border border-black" style={{ whiteSpace: 'nowrap' }}>{formatDOB(item.DOB)}</td>
                                    <td className="p-2 border border-black">{item.House}</td>
                                    <td className="p-2 border border-black">{item.Street_Name}</td>
                                    <td className="p-2 border border-black">{item.Street_Type}</td>
                                    <td className="p-2 border border-black">{item.City}</td>
                                    <td className="p-2 border border-black">{item.State}</td>
                                    <td className="p-2 border border-black">{item.Zip_Code}</td>
                                    <td className="p-2 border border-black">{item.SSN}</td>
                                    <td className="p-2 border border-black">{item.FICO_Score}</td>
                                    <td className="p-2 border border-black">{item.Tier}</td>
                                    <td className="p-2 border border-black">{item.ScoreCard_Type}</td>
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