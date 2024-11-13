import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
const FCLPage = () => {
    const [product, setProduct] = useState('');
    const [scoreCard, setScoreCard] = useState('');
    const [salesProgram, setSalesProgram] = useState('');
    const [term, setTerm] = useState('');
    const [score, setScore] = useState('');
    const [ltv, setLtv] = useState('');
    const [ltvData, setLTVData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSearch = () => {
        if (!ltv) {
            setErrorMessage('Please provide value');
            setLTVData(null);
            return;
        }
        const searchParams = { product, scoreCard, salesProgram, term, score, ltv };
        setLoading(true);
        axios.post('http://localhost:8080/search', searchParams)
            .then((response) => {
                if (response.data === 'No data available') {
                    setErrorMessage('No data available');
                    setLTVData(null);
                } else {
                    setLTVData(response.data);
                    setErrorMessage('');
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setErrorMessage('An error occurred while fetching data.');
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <div className="p-2">
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">FCL</h1>
            <div className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap">
                <div>
                    <label className="px-1 font-medium" htmlFor="Product">Product:</label>
                    <select className="border border-black rounded p-1 w-32" value={product} onChange={(e) => setProduct(e.target.value)}>
                        <option value="">Select Product</option>
                        <option value="Retail & Balloon">Retail & Balloon</option>
                        <option value="Lease">Lease</option>
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="ScoreCard">ScoreCard:</label>
                    <select className="border border-black rounded p-1 w-32" value={scoreCard} onChange={(e) => setScoreCard(e.target.value)}>
                        <option value="">Select ScoreCard</option>
                        <option value="THN">THN</option>
                        <option value="DLQ">DLQ</option>
                        <option value="CLN">CLN</option>
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="SalesProgram">SalesProgram:</label>
                    <select className="border border-black rounded p-1 w-32" value={salesProgram} onChange={(e) => setSalesProgram(e.target.value)}>
                        <option value="">Select Sales Program</option>
                        <option value="Standard">Standard</option>
                        <option value="Incentive & Special">Incentive & Special</option>
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Term">Term:</label>
                    <select className="border border-black rounded p-1 w-32" value={term} onChange={(e) => setTerm(e.target.value)}>
                        <option value="">Select Term</option>
                        <option value="Regular">Regular</option>
                        <option value="Extended">Extended</option>
                    </select>
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Score">Score:</label>
                    <input className="border border-black rounded p-1 w-32"
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    />
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="Ltv">LTV:</label>
                    <input className="border border-black rounded p-1 w-32"
                        type="number"
                        value={ltv}
                        onChange={(e) => setLtv(e.target.value)}
                    />
                </div>
                <button onClick={handleSearch} className="rounded-full p-2 mx-2 border border-black">
                    <FaSearch />
                </button>
            </div>
            {loading && <p className="text-center text-xl">Loading...</p>}
            {ltvData && (
                <div className="bg-gray-100 border border-gray-300 rounded-lg p-5 mt-5 shadow-md">
                    <h3 className="font-bold text-xl text-gray-800">Result:</h3>
                    <p className="text-lg text-gray-700">
                        FCL (Value based on LTV calculated and score card table) * Modifier value based on sales program type
                    </p>
                    <p className="text-lg text-gray-700">LTV = Approved Amount / (MSRP + D&H)</p>
                    <p className="font-bold text-lg text-gray-800">The FCL value is: {ltvData}</p>
                </div>
            )}
            <div className="p-4 text-center w-full text-2xl">
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
};
export default FCLPage;