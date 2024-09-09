import { NavLink } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

export default function SideBar({ isOpen, onClose, sidebarRef }) {
    return (
        <div ref={sidebarRef} className={`fixed inset-0 z-40 bg-gray-200 text-black max-w-48 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="w-full h-full overflow-y-auto ">
                <div  className='text-3xl p-4 px-8 w-full text-blue-700'>
                    <RxCross2 className='cursor-pointer' onClick={onClose}/>
                </div>
                <div className='' />
                <ul className="mt-10 space-y-2">
                    <li><NavLink to="/VinGenerator" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>VIN Generator</NavLink></li>
                    <li><NavLink to="/Dealer" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Dealer Details</NavLink></li>
                    <li><NavLink to="/Origenate" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Origenate Details</NavLink></li>
                    <li><NavLink to="/AutoApproval" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>AutoApproval</NavLink></li>
                    <li><NavLink to="/CustomerProfile" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>CustomerProfile</NavLink></li>
                    <li><NavLink to="/Fcl" className={({ isActive }) => ` block text-black text-center p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Fcl</NavLink></li>
                </ul>
            </div>
        </div>
    );
}