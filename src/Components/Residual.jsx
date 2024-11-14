import { FaSearch, FaHome } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Residual = () => {
    const [formState, setFormState] = useState({
        Vehicle_Type: '',
        Finance: '',
        Vehicle_Year: '',
    });
    const [vehicleType, setvehicleType] = useState([]);
    const [Finance, setFinance] = useState([]);
    const [Vehicle_Year, setVehicle_Year] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customerDataResponse, vehicleTypeResponse, FinanceResponse, Vehicle_YearResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/residual'),
                    
                    axios.get('http://localhost:8080/api/getVehicleType'),
                    
                    axios.get('http://localhost:8080/api/getFinance'),
                    axios.get('http://localhost:8080/api/getVehicle_Year'),
                    

                ]);
                setFilteredData(customerDataResponse.data);
                
                setvehicleType(vehicleTypeResponse.data);
                
                setFinance(FinanceResponse.data);
                setVehicle_Year(Vehicle_YearResponse.data);
                
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
            const response = await axios.post('http://localhost:8080/api/residual', formState);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleReset = async () => {
        setFormState({
            
            Vehicle_Type: '',
            
            Finance: '',
            Vehicle_Year: '',
            
        });
        try {
            const response = await axios.get('http://localhost:8080/api/residual');
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className="p-2">
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">Residual</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
               
                <div>
                    <label className="px-1 font-medium" htmlFor="Vehicle_Type">Vehicle Type:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Vehicle_Type"
                        id="Vehicle_Type"
                        value={formState.Vehicle_Type}
                        onChange={handleChange}
                    >
                        <option value="">NA</option>
                        {vehicleType.map((vehicleType, index) => (
                            <option key={index} value={vehicleType}>{vehicleType}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="px-1 font-medium" htmlFor="Finance">Finance:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Finance"
                        id="Finance"
                        value={formState.Finance}
                        onChange={handleChange}
                    >
                        <option value="">NA</option>
                        {Finance.map((Finance, index) => (
                            <option key={index} value={Finance}>{Finance}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Vehicle_Year">Vehicle_Year:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Vehicle_Year"
                        id="Vehicle_Year"
                        value={formState.Vehicle_Year}
                        onChange={handleChange}
                    >
                        <option value="">NA</option>
                        {Vehicle_Year.map((Vehicle_Year, index) => (
                            <option key={index} value={Vehicle_Year}>{Vehicle_Year}</option>
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
                            <th className="p-4 border border-black text-blue-900">Module</th>
                            <th className="p-4 border border-black text-blue-900">Brand</th>
                            <th className="p-4 border border-black text-blue-900">Finance</th>
                            <th className="p-4 border border-black text-blue-900">Vehicle_Type</th>
                            <th className="p-4 border border-black text-blue-900">Formula</th>
                            <th className="p-4 border border-black text-blue-900">Formula_Field</th>
                            <th className="p-4 border border-black text-blue-900">Vehicle_Year</th>
                            <th className="p-4 border border-black text-blue-900">Formula_Field_Expansion</th>
                            
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
                                    <td className="p-2 border border-black">{item.Module}</td>
                                    <td className="p-2 border border-black">{item.Brand}</td>
                                    <td className="p-2 border border-black">{item.Finance}</td>
                                    <td className="p-2 border border-black">{item.Vehicle_Type}</td>
                                    <td className="p-2 border border-black">{item.Formula}</td>
                                    <td className="p-2 border border-black">{item.Formula_Field}</td>
                                    <td className="p-2 border border-black">{item.Vehicle_Year}</td>
                                    <td className="p-2 border border-black">{item.Formula_Field_Expansion}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};
export default Residual;