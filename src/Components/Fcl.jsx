import { FaSearch, FaHome } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Fcl = () => {
    const [formState, setFormState] = useState({
        Product: '',
        Vehicle_Type: '',
        Score_Card: '',
        SalesProgram: '',
        Term: '',
        Modifier: '',
    });
    const [products, setProducts] = useState([]);
    const [vehicleType, setvehicleType] = useState([]);
    const [scoreCard, setScoreCard] = useState([]);
    const [salesProgram, setSalesProgram] = useState([]);
    const [term, setTerm] = useState([]);
    const [modifier, setModifier] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [customerDataResponse, productsResponse, vehicleTypeResponse, scoreCardResponse, salesProgramResponse, termResponse, modifierResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/fcl'),
                    axios.get('http://localhost:8080/api/getProducts'),
                    axios.get('http://localhost:8080/api/getVehicleType'),
                    axios.get('http://localhost:8080/api/getScoreCard'),
                    axios.get('http://localhost:8080/api/getSalesProgram'),
                    axios.get('http://localhost:8080/api/getTerm'),
                    axios.get('http://localhost:8080/api/getModifier'),

                ]);
                setFilteredData(customerDataResponse.data);
                setProducts(productsResponse.data);
                setvehicleType(vehicleTypeResponse.data);
                setScoreCard(scoreCardResponse.data);
                setSalesProgram(salesProgramResponse.data);
                setTerm(termResponse.data);
                setModifier(modifierResponse.data);
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
            const response = await axios.post('http://localhost:8080/api/fcl', formState);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleReset = async () => {
        setFormState({
            Product: '',
            Vehicle_Type: '',
            ScoreCard: '',
            SalesProgram: '',
            Term: '',
            Modifier: '',
        });
        try {
            const response = await axios.get('http://localhost:8080/api/fcl');
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className="p-2">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700">FCL</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <div>
                    <label className="px-1 font-medium" htmlFor="Product">Product:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Product"
                        id="Product"
                        value={formState.Product}
                        onChange={handleChange}
                    >
                        <option value="">Select Product</option>
                        {products.map((product, index) => (
                            <option key={index} value={product}>{product}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Vehicle_Type">Vehicle Type:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Vehicle_Type"
                        id="Vehicle_Type"
                        value={formState.Vehicle_Type}
                        onChange={handleChange}
                    >
                        <option value="">Select Vehicle Type</option>
                        {vehicleType.map((vehicleType, index) => (
                            <option key={index} value={vehicleType}>{vehicleType}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Score_Card">ScoreCard:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Score_Card"
                        id="Score_Card"
                        value={formState.Score_Card}
                        onChange={handleChange}
                    >
                        <option value="">Select ScoreCard</option>
                        {scoreCard.map((scoreCard, index) => (
                            <option key={index} value={scoreCard}>{scoreCard}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="SalesProgram">SalesProgram:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="SalesProgram"
                        id="SalesProgram"
                        value={formState.SalesProgram}
                        onChange={handleChange}
                    >
                        <option value="">Select SalesProgram</option>
                        {salesProgram.map((salesProgram, index) => (
                            <option key={index} value={salesProgram}>{salesProgram}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Term">Term:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Term"
                        id="Term"
                        value={formState.Term}
                        onChange={handleChange}
                    >
                        <option value="">Select Term</option>
                        {term.map((term, index) => (
                            <option key={index} value={term}>{term}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Modifier">Modifier:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        name="Modifier"
                        id="Modifier"
                        value={formState.Modifier}
                        onChange={handleChange}
                    >
                        <option value="">Select Modifier</option>
                        {modifier.map((modifier, index) => (
                            <option key={index} value={modifier}>{modifier}</option>
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
                            <th className="p-4 border border-black text-blue-700">Product</th>
                            <th className="p-4 border border-black text-blue-700">Vehicle_Type</th>
                            <th className="p-4 border border-black text-blue-700">Score_Card</th>
                            <th className="p-4 border border-black text-blue-700">SalesProgram</th>
                            <th className="p-4 border border-black text-blue-700">Term</th>
                            <th className="p-4 border border-black text-blue-700">Formula</th>
                            <th className="p-4 border border-black text-blue-700">LTV_Calculated</th>
                            <th className="p-4 border border-black text-blue-700">Modifier</th>
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
                                    <td className="p-2 border border-black">{item.Product}</td>
                                    <td className="p-2 border border-black">{item.Vehicle_Type}</td>
                                    <td className="p-2 border border-black">{item.Score_Card}</td>
                                    <td className="p-2 border border-black">{item.SalesProgram}</td>
                                    <td className="p-2 border border-black">{item.Term}</td>
                                    <td className="p-2 border border-black">{item.Formula}</td>
                                    <td className="p-2 border border-black">{item.LTV_Calculated}</td>
                                    <td className="p-2 border border-black">{item.Modifier}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};
export default Fcl;