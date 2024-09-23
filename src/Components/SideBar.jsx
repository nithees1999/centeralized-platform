import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

export default function SideBar({ isOpen, onClose, sidebarRef }) {
    const [isFormulaOpen, setIsFormulaOpen] = useState(false);
    const location = useLocation();
    const isFormulaActive = location.pathname === '/Fcl' || location.pathname === '/Residual';
    const toggleFormulaMenu = () => {
        setIsFormulaOpen(!isFormulaOpen);
    };
    return (
        <div ref={sidebarRef} className={`fixed inset-0 z-40 bg-gray-200 text-black max-w-48 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="w-full h-full overflow-y-auto">
                <div className='text-3xl p-4 px-8 w-full text-blue-700'>
                    <RxCross2 className='cursor-pointer' onClick={onClose} />
                </div>
                <ul className="mt-10 space-y-2">
                    <li><NavLink to="/VinGenerator" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>VIN Generator</NavLink></li>
                    <li><NavLink to="/Dealer" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Dealer Details</NavLink></li>
                    <li><NavLink to="/Origenate" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Origenate Details</NavLink></li>
                    <li><NavLink to="/AutoApproval" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>AutoApproval</NavLink></li>
                    <li><NavLink to="/CustomerProfile" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>CustomerProfile</NavLink></li>
                    <li><NavLink to="#" onClick={toggleFormulaMenu} className={`block text-center p-2 font-bold hover:underline hover:underline-offset-8 ${isFormulaActive ? "text-blue-700 underline underline-offset-8" : "text-black"}`}>Formula{isFormulaOpen ? <IoMdArrowDropdown className='inline-block' /> : <IoMdArrowDropright className='inline-block' />}</NavLink>
                        {isFormulaOpen && (
                            <ul className="mt-2">
                                <li><NavLink to="/Fcl" className={({ isActive }) => `block text-black text-center p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>Fcl</NavLink></li>
                                <li><NavLink to="/Residual" className={({ isActive }) => `block text-black text-center p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>Residual</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li><NavLink to="/DecisionRules" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>DecisionRules</NavLink></li>
                </ul>
            </div>
        </div>
    );
}