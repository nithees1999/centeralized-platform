import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import data from './ToleranceRules/ToleranceRulesData.json'

const SearchComponent = () => {

    const navigate = useNavigate();

    // Fuse.js options
    const options = {
        keys: ['title'], // specify the keys to search in
        threshold: 0.3,  // adjust threshold for fuzzy matching
    };

    const fuse = new Fuse(data, options);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term) {
            const result = fuse.search(term);
            setResults(result.map(res => res.item)); // get the original item
        } else {
            setResults([]);
        }
    };

    const handleClick = (result) => {
        // const term = event.target.value;
        setSearchTerm(result);
        setResults([]);
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const selectedTitle = data.find(item => item.title === `${searchTerm}`);
        const isSelectedTitlePresent = selectedTitle === undefined;
        if (!isSelectedTitlePresent) {
            // console.log("Item found:");
            navigate(`/${selectedTitle.navigationLink}`);
        } else {
            // console.error("Error: Item not found. Please try with another input.");
        }
        console.log("this is what we say", searchTerm)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search..."
                required
            />
            <button type="submit" className='border-black border-2'>Click me</button>
            <ul>
                {results.map(item => (
                    <li onClick={() => handleClick(item.title)} key={item.id}>{item.title}</li>
                ))}
            </ul>
        </form>
    );
};

export default SearchComponent;
