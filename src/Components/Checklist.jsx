import { FaSearch, FaHome } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
const Checklist = () => {
    const [formState, setFormState] = useState({ Description: '' });
    const [description, setDescription] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const descriptionResponse = await axios.get('http://localhost:8080/api/getDescription');
                setDescription(descriptionResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
       
        clearTimeout(window.typingTimeout);
        window.typingTimeout = setTimeout(() => {
            const filteredSuggestions = description.filter(desc =>
                desc.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 3); 
            setSuggestions(filteredSuggestions);
            setSelectedIndex(-1); 
        }, 300);
    };
    
    const handleSelectSuggestion = (suggestion) => {
        setFormState({ Description: suggestion });
        setSuggestions([]);
    };
    
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            handleSelectSuggestion(suggestions[selectedIndex]);
        }
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        if (formState.Description.trim() === '') {
            alert("Please enter a description");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/Checklist', formState);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleReset = async () => {
        setFormState({ Description: '' });
        setFilteredData([]);
        setSuggestions([]); 
    };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            const suggestionsList = document.getElementById('suggestions-list');
            if (suggestionsList && !suggestionsList.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div className="p-2">
            <h1 className="text-center text-xl font-bold p-2 text-blue-900">CheckList</h1>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSearch}
            >
                <div className="relative">
                    <label className="px-1 font-medium" htmlFor="Description">Description:</label>
                    <input
                        className="border border-black rounded p-1 w-96"
                        name="Description"
                        id="Description"
                        value={formState.Description}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} 
                        placeholder="Type Description"
                    />
                   
                    {suggestions.length > 0 && (
                        <ul id="suggestions-list" className="absolute border border-gray-300 bg-white w-62">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                    className={`cursor-pointer p-1 hover:bg-gray-200 ${selectedIndex === index ? 'bg-gray-200' : ''}`}
                                    role="option"
                                    aria-selected={selectedIndex === index}
                                >
                                    {suggestion.split(new RegExp(`(${formState.Description})`, 'i')).map((part, i) =>
                                        part.toLowerCase() === formState.Description.toLowerCase() ? (
                                            <span key={i} className="bg-yellow-300">{part}</span>
                                        ) : (
                                            part
                                        )
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit" className="rounded-full p-2 mx-2 border border-black">
                    <FaSearch />
                </button>
                <button type="button" onClick={handleReset} className="rounded-full p-2 mx-2 border border-black">
                    <FaHome />
                </button>
                {loading && <div>Loading...</div>}
            </form>
            <section className=" py-8 px-4 m-2 border border-black rounded-md">
                <table className="w-full">
                    <thead className="border border-black">
                        <tr>
                            <th className="p-4 border border-black text-blue-900">Category</th>
                            <th className="p-4 border border-black text-blue-900">Active</th>
                            <th className="p-4 border border-black text-blue-900">Validation Type</th>
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
                                    <td className="p-2 border border-black">{item.Category}</td>
                                    <td className="p-2 border border-black">{item.Active}</td>
                                    <td className="p-2 border border-black">{item.Validation_Type}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
};
export default Checklist;