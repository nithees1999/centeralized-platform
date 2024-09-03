import { FaSearch, FaUndo } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const CustomerProfile = () => {
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [ficoScore, setFicoScore] = useState('');
    const [tiers, setTiers] = useState([]);
    const [selectedTier, setSelectedTier] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);

    //Initial data
    useEffect(() => {
        fetch('http://localhost:8080/api/customerprofile')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching initial data:', error));
    }, []);

//fetching states
    useEffect(() => {
        fetch('http://localhost:8080/api/getStates')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched states:', data);
                setStates(data);
            })
            .catch(error => console.error('Error fetching states:', error));
    }, []);

//fetching tier
    useEffect(() => {
        fetch('http://localhost:8080/api/getTier')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched tiers:', data);
                setTiers(data);
            })
            .catch(error => console.error('Error fetching tiers:', error));
    }, []);



    /*  const calculateTier = (score) => {
          if (score >= 760) return '1';
          if (score >= 720) return '2';
          if (score >= 710) return '3';
          return 'No Tier';
      };
      useEffect(() => {
          if (ficoScore) {
              setTier(calculateTier(Number(ficoScore)));
          } else {
              setTier('');
          }
      }, [ficoScore]);
   
   */
//filtering
    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        const filtered = data.filter(item => {
            const stateMatch = selectedState ? item.State === selectedState : true;
            const tierMatch = selectedTier ? item.Tier === Number(selectedTier) : true;
            const ficoMatch = ficoScore ? item["FICO Score"] === Number(ficoScore) : true;
            return stateMatch && ficoMatch && tierMatch;
        });
        setFilteredData(filtered);
        setLoading(false);
    };


    const handleReset=()=>{
        setFilteredData(data);
        setSelectedState('');
        setFicoScore('');
        setSelectedTier('');
    };
    const formatDOB = (dob) => {
        const date = new Date(dob);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    return (
        <div className=" p-2 ">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700  ">CUSTOMER PROFILE</h1>
            
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap "
                onSubmit={handleSearch}
            >
                <div>
                    <label className="px-1 font-medium" htmlFor="State">State:</label>
                    <select
                        className="border border-black rounded p-1 w-32 "
                        name="State"
                        id="State"
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
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
                        className="border border-black rounded p-1 w-32 "
                        name="Tier"
                        id="Tier"
                        type="number"
                        value={selectedTier}
                        onChange={(e) => setSelectedTier(e.target.value)}
                    >
                        <option value="">Select Tier</option>
                        {tiers.map((tier, index) => (
                            <option key={index} value={tier}>{tier}</option>
                        ))}
                    </select>


                </div>


                <div>
                    <label className="px-1 font-medium " htmlFor="fico-score">FICO Score:</label>
                    <input
                        className="border border-black rounded p-1 w-32 "
                        type="number"
                        value={ficoScore}
                        onChange={(e) => setFicoScore(e.target.value)}
                    />
                </div>
                <button type="submit" className="rounded-full p-2 mx-2 border border-black">
                    <FaSearch />
                </button>
                <button type="button" onClick={handleReset} className="rounded-full p-2 mx-2 border border-black">
                <FaUndo />
                </button>
                {loading && <div>Loading...</div>}
            </form>
            <section className="min-h-screen py-8 px-4 m-2 border-2 border-black rounded-md">
            {filteredData.length === 0 && !loading && (<div className="flex justify-center items-center min-h-full">No data available</div>)}
            {filteredData.length>0 &&(

           
                <table className="w-full">
                    <thead className="border border-black ">
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
                        </tr>
                    </thead>
                    <tbody className="border border-black">
                    
                        {filteredData.map((item, index) => (
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