import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";

import SideBar from './SideBar';

export default function NavBar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <nav className="bg-gray-800 text-white w-full">
            <div className='flex justify-between mx-4 p-4'>
                <button onClick={toggleSidebar} className='text-3xl cursor-pointer'>
                 <RxHamburgerMenu  />
                </button>
                <Link to="/" className="text-xl font-bold">Centralized Platform</Link>
            </div>

            <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        </nav>
    );
}