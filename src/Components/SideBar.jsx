import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { Tooltip } from 'react-tooltip'
import { FaSearch } from "react-icons/fa";
import ToleranceRulesModal from './ToleranceRules/ToleranceRulesModal'
import data from './ToleranceRules/ToleranceRulesData.json'

export default function SideBar({ isOpen, onClose, sidebarRef }) {
    const location = useLocation();

    //Modal
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // formula page
    const [isFormulaOpen, setIsFormulaOpen] = useState(false);
    const isFormulaActive = location.pathname === '/Fcl' || location.pathname === '/Residual';
    const toggleFormulaMenu = () => {
        setIsFormulaOpen(!isFormulaOpen);
    };

    //Tolerance rules
    const [isTolerance, setIsTolerance] = useState(false);
    const isToleranceActive = data.some(item => location.pathname === `/${item.navigationLink}`); // Check if any item matches the current path
    const toggleToleranceMenu = () => {
        setIsTolerance(!isTolerance);
    };

    return (
        <div ref={sidebarRef} className={`fixed inset-0 z-40 bg-blue-950 text-white max-w-48 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <ToleranceRulesModal open={open} onCloseModal={onCloseModal} />
            <div className="w-full h-full overflow-y-auto">
                <div className='text-3xl p-4 px-8 w-full'>
                    <RxCross2 className='cursor-pointer' onClick={onClose} />
                </div>
                <ul className="mt-5 space-y-2 pl-5 ">
                    <li><NavLink to="/VinGenerator" className={({ isActive }) => ` block    p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8 " : "   "}`}>VIN Generator</NavLink></li>
                    <li><NavLink to="/Dealer" className={({ isActive }) => ` block    p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8 " : "   "}`}>Dealer Details</NavLink></li>
                    <li><NavLink to="/Origenate" className={({ isActive }) => ` block    p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8 " : "   "}`}>Origenate Details</NavLink></li>
                    <li><NavLink to="/AutoApproval" className={({ isActive }) => ` block    p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8 " : "   "}`}>Auto Approval</NavLink></li>
                    <li><NavLink to="/CustomerProfile" className={({ isActive }) => ` block    p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8 " : "   "}`}>Customer Profile</NavLink></li>
                    <li><NavLink to="#" onClick={toggleFormulaMenu} className={`block  p-2 font-bold hover:underline hover:underline-offset-8 ${isFormulaActive ? "text-gray-500 underline underline-offset-8" : " "}`}>Formula{isFormulaOpen ? <IoMdArrowDropdown className='inline-block' /> : <IoMdArrowDropright className='inline-block' />}</NavLink>
                        {isFormulaOpen && (
                            <ul className="mt-2">
                                <li><NavLink to="/Fcl" className={({ isActive }) => `block   p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8" : " "}`}>FCL</NavLink></li>
                                <li><NavLink to="/Residual" className={({ isActive }) => `block   p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8" : " "}`}>Residual</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li><NavLink to="/DecisionRules" className={({ isActive }) => ` block    p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8 " : "   "}`}>DecisionRules</NavLink></li>
                    <li>
                        {/* <NavLink to="#" onClick={toggleToleranceMenu} className={`block  p-2 font-bold hover:underline hover:underline-offset-8 ${isToleranceActive ? "text-gray-500 underline underline-offset-8" : " "}`}>Tolerance{isTolerance ? <IoMdArrowDropdown className='inline-block' /> : <IoMdArrowDropright className='inline-block' />}</NavLink>
                        <FaSearch className="mx-2" /> */}
                        <div className={`flex items-center p-2 ${isToleranceActive ? "text-gray-500 underline underline-offset-8" : " "} cursor-pointer`}>
                            <span className="font-bold hover:underline hover:underline-offset-8" onClick={toggleToleranceMenu}>Tolerance</span>
                            {isTolerance ? <IoMdArrowDropdown className='inline-block' /> : <IoMdArrowDropright className='inline-block' />}
                            <FaSearch className="mx-2" onClick={onOpenModal} />
                        </div>

                        {isTolerance && (
                            <div className="max-h-48 overflow-y-auto">
                                {data.map((item, index) => (
                                    <ul className="mt-2" key={index}>
                                        <Tooltip id={item.id} />
                                        <li><NavLink data-tooltip-id={item.id} data-tooltip-content={item.title} to={item.navigationLink} className={({ isActive }) => `block    p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8" : " "}`}>{item.shorthand}</NavLink></li>
                                    </ul>
                                ))}
                            </div>
                        )}
                    </li>
                    <li><NavLink to="/Checklist" className={({ isActive }) => ` block   p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-gray-500 underline underline-offset-8 " : "   "}`}>Checklist</NavLink></li>
                </ul>
            </div>
        </div>
    );
}