// import BackgroundImage from "../Images/BackgroundImage1.jpg"
import BackgroundImage from "../Images/BGPic.jpg"

export default function Home() {
    return (
        <div className="min-h-screen flex justify-center items-start "
            style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: '50%',
                // backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="bg-gray-200 bg-opacity-50 p-5 m-5">
                <h1 className=" text-4xl font-bold">Data Discovering studio</h1>
            </div>
        </div>
    );
}