import { Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

export default function SideBar({ isOpen, onClose }) {
    return (
        <div className={`fixed inset-0 z-40 bg-gray-900 max-w-60 text-white transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="w-full h-full overflow-y-auto">
                <button onClick={onClose} className='text-3xl cursor-pointer p-4 px-8 bg-gray-800 w-full'>
                    <RxCross2 />
                </button>
                <ul className="mt-10 space-y-5">
                    <li><Link to="/" className="block py-2 px-4 text-center text-xl hover:bg-gray-700">Home</Link></li>
                    <li><Link to="/VinGenerator" className="block py-2 px-4 text-center text-xl hover:bg-gray-700">VIN Generator</Link></li>
                    <li><Link to="/VinResult" className="block py-2 px-4 text-center text-xl hover:bg-gray-700">VIN Result</Link></li>
                </ul>
            </div>
        </div>
    );
}