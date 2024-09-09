import { FaSearch, FaUndo } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const Fcl = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    
    const [vehicleTypes,setVehicleTypes]=useState([]);
    const [selectedVehicleType, setSelectedVehicleType] = useState('');
    
    
    
    const [ficoScore, setFicoScore] = useState('');
    const [tiers, setTiers] = useState([]);
    const [selectedTier, setSelectedTier] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedScoreCardType, setSelectedScoreCardType] = useState('');
    const [scoreCardTypes,setScoreCardTypes]=useState([]);

   
   
    //Initial data
    useEffect(() => {
        fetch('http://localhost:8080/api/fcl')
            .then(response => response.json())
            .then(data => {
                setData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching initial data:', error));
    }, []);




   

//fetching states
    useEffect(() => {
        fetch('http://localhost:8080/api/getProducts')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched states:', data);
                setProducts(data);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);


//fetching vehicleType

useEffect(() => {
    fetch('http://localhost:8080/api/getVehicleTypes')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Vehicle Types:',data);
            setVehicleTypes(data);
        })
        .catch(error => console.error('Error fetching Vehicle Types:', error));
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
            const productMatch = selectedProduct ? item.Product === selectedProduct : true;
            const vehicleTypeMatch = selectedVehicleType ? item["Vehicle Type"]===selectedVehicleType : true;
            const tierMatch = selectedTier ? item.Tier === Number(selectedTier) : true;
            const ficoMatch = ficoScore ? item["FICO Score"] === Number(ficoScore) : true;
            const scoreCardTypeMatch = selectedScoreCardType ? item["ScoreCard Type"]===selectedScoreCardType : true;
            return productMatch && ficoMatch && tierMatch && scoreCardTypeMatch;
        });
        setFilteredData(filtered);
        setLoading(false);
    };


    const handleReset=()=>{
        setFilteredData(data);
        setSelectedProduct('');


        setFicoScore('');
        setSelectedTier('');
        setSelectedScoreCardType('');
    };
 


    return (
        <div className=" p-2 ">
            <h1 className="text-center text-xl font-bold p-2 text-blue-700  ">FCL</h1>

            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap "
                onSubmit={handleSearch}
            >
                <div>
                    <label className="px-1 font-medium" htmlFor="Product">Product:</label>
                    <select
                        className="border border-black rounded p-1 w-32 "
                        name="Product"
                        id="Product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                    >
                        <option value="">Select Product</option>
                        {products.map((product, index) => (
                            <option key={index} value={product}>{product}</option>
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
                <div>
                    <label className="px-1 font-medium " htmlFor="ScoreCardType">ScoreCard :</label>
                    <select
                        className="border border-black rounded p-1 w-32 "
                        name="ScoreCardType"
                        id="ScoreCardType"
                        value={selectedScoreCardType}
                        onChange={(e) => setSelectedScoreCardType(e.target.value)}
                    >
                    <option value="">Select ScoreCard</option>

                    {
                        scoreCardTypes.map((type,index)=>(
                            <option key={index} value={type}>{type}</option>
                        ))
                    }
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
            <section className="min-h-screen py-8 px-4 m-2 border-2 border-black rounded-md">
            {filteredData.length === 0 && !loading && (<div className="flex justify-center items-center min-h-full">No data available</div>)}
            {filteredData.length>0 &&(

           
                <table className="w-full">
                    <thead className="border border-black ">
                        <tr>
                            <th className="p-4 border border-black text-blue-700">Product</th>
                            <th className="p-4 border border-black text-blue-700">Last Name</th>
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
                                <td className="p-2 border border-black">{item.Product}</td>
                                <td className="p-2 border border-black">{item["Last Name"]}</td>
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
                        ))}
                    </tbody>
                </table>
                )}
            </section>
        </div>
    );
};
export default Fcl;