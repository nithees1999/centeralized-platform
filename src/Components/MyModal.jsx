import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const MyModal = (props) => {
    const { open, onCloseModal, creds, modalInputChange , handlePasswordUpdate,updateResponse } = props

    return (
        <div>
            <Modal classNames={{ modal: "w-full max-w-md p-6 bg-white rounded-lg shadow-lg" }} open={open} onClose={onCloseModal} center>
                <h2 className="text-2xl font-semibold mb-4">Update Creds</h2>
                <div className='flex flex-col space-y-4'>
                    <div>
                        <label htmlFor="">User ID :</label>
                        <label
                            name='User_ID'
                            type="text"
                            onChange={modalInputChange}
                            className='mx-4'
                            placeholder="Enter User ID"
                        >{creds.User_ID}</label>
                    </div>

                    <div>
                        <label htmlFor="">Password :</label>
                        <input
                            name='Password'
                            type="text"
                            value={creds.Password}
                            onChange={modalInputChange}
                            className='p-2 mx-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder="Enter Password"
                        />
                    </div>

                    <div>
                        <label htmlFor="">Admin Password :</label>
                        <input
                            name='AdminPassword'
                            type="text"
                            value={creds.AdminPassword}
                            onChange={modalInputChange}
                            className='p-2 mx-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder="Authentication password"
                        />
                    </div>
                </div>
                <button className='mt-4 px-4 py-2 border-2 border-black bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={handlePasswordUpdate} creds={creds}>
                    Update
                </button>
                <p className='text-center text-blue-700 text-xl font-bold'>{updateResponse}</p>
            </Modal>

        </div>
    );
};

export default MyModal;