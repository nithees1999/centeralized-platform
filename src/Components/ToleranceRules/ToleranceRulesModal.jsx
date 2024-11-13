import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';
import data from './ToleranceRulesData.json'

const ToleranceRulesModal = (props) => {
    const { open, onCloseModal } = props

    const navigate = useNavigate();

    // Fuse.js options
    const options = {
        keys: ['title','shorthand'], // specify the keys to search in
    };

    const fuse = new Fuse(data, options);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isItemFound, setIsItemFound] = useState(true);

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
            setIsItemFound(true)
            navigate(`${selectedTitle.navigationLink}`);
            onCloseModal()
            setSearchTerm("")
        } else {
            setIsItemFound(false)
        }
    }

    return (
        <div>
            <Modal classNames={{ modal: "w-full max-w-md p-12  bg-white rounded-lg shadow-lg" }} open={open} onClose={onCloseModal} center>
                <h2 className="text-2xl font-semibold mb-4">Search Tolerance Rules</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className={`w-full p-2 border ${isItemFound ? "border-gray-300" : "border-red-500"}  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search..."
                        required
                    />
                    {!isItemFound ? <span>Enter valid Rule Name</span> : null}
                    <button type="submit" className="mt-2 w-full bg-blue-900 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">Submit</button>
                    <ul className="max-h-60 overflow-y-auto">
                        {results.map(item => (
                            <li className="cursor-pointer p-2 hover:bg-blue-100 transition duration-150 rounded-lg" onClick={() => handleClick(item.title)} key={item.id}>{item.shorthand} :- {item.title}</li>
                        ))}
                    </ul>
                </form>
            </Modal>

        </div>
    );
};

export default ToleranceRulesModal;