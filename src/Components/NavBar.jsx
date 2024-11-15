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
        <nav className="bg-blue-950 w-full text-white">
            <div className='flex justify-between mx-4 p-4'>
                <button onClick={toggleSidebar} className='text-2xl cursor-pointer'>
                    <RxHamburgerMenu />
                </button>
                <div>
                    <button className='bg-blue-900 py-1 px-2 mx-2 rounded-lg '>Prism </button>
                    <span><NavLink to="/" className=" font-bold">Centralized Platform</NavLink></span>
                </div>
            </div>

            <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} sidebarRef={sidebarRef} />

        </nav>
    );
}