import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

import SideBar from './SideBar';

export default function NavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = (event) => {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    }

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isSidebarOpen]);


    return (
        <nav className="bg-gray-200 w-full text-blue-700">
            <div className='flex justify-between mx-4 p-4'>
                <button onClick={toggleSidebar} className='text-2xl cursor-pointer'>
                    <RxHamburgerMenu />
                </button>
                <span><NavLink to="/" className=" font-bold">Centralized Platform</NavLink></span>
            </div>

            <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} sidebarRef={sidebarRef} />

        </nav>
    );
}