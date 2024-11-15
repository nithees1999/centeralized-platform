import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const UploadExcelModal = (props) => {
    const { open, onCloseModal, creds , handlePasswordUpdate } = props

    return (
        <div>
            <Modal classNames={{ modal: "w-full max-w-md p-6 bg-white rounded-lg shadow-lg" }} open={open} onClose={onCloseModal} center>
                <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
                <div className='flex flex-col space-y-4'>
                <label for="myfile">Select a file:</label>
                <input type="file" id="myfile" name="myfile"/>
                    {/* <div>
                        <label htmlFor="">User ID :</label>
                        <label
                            name='User_ID'
                            type="text"
                            onChange={modalInputChange}
                            className='mx-4'
                            placeholder="Enter User ID"
                        >id</label>
                    </div> */}

                    {/* <div>
                        <label htmlFor="">Password :</label>
                        <input
                            name='Password'
                            type="text"
                            value={creds.Password}
                            onChange={modalInputChange}
                            className='p-2 mx-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder="Enter Password"
                        />
                    </div> */}

                    <div>
                        <label htmlFor="">Admin Password :</label>
                        <input
                            name='AdminPassword'
                            type="text"
                            // value={creds.AdminPassword}
                            // onChange={modalInputChange}
                            className='p-2 mx-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                            placeholder="Authentication password"
                        />
                    </div>
                </div>
                <button className='mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500' onClick={handlePasswordUpdate} creds={creds}>
                    Upload
                </button>
                {/* <p className='text-center text-blue-900 text-xl font-bold'>{updateResponse}</p> */}
            </Modal>

        </div>
    );
};

export default UploadExcelModal;