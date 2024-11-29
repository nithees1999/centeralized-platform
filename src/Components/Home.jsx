// import BackgroundImage from "../Images/BackgroundImage1.jpg"
import BackgroundImage from "../Images/BGPic.jpg"

export default function Home() {
    return (
        <div className="min-h-screen flex justify-center items-start "
            style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: '50%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="p-5 m-5">
                <h1 className=" text-blue-900 text-4xl font-bold">Data Discovery Studio</h1>
            </div>
        </div>
    );
}