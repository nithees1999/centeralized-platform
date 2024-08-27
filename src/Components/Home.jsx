// import BackgroundImage from "../Images/BackgroundImage1.jpg"

export default function Home() {
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100"
            // style={{
            //     backgroundImage: `url(${BackgroundImage})`,
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center'
            // }}
        >
            <div className="bg-gray-600 bg-opacity-50 p-5 ">
                <h1 className=" text-4xl font-bold">Data Discovering studio</h1>
            </div>
        </div>
    );
}