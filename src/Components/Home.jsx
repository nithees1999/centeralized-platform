import BackgroundImage from "../Images/BackgroundImage.jpg"

export default function Home() {
    return (
        <div className="min-h-screen flex justify-center items-center" style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="bg-cyan-600 bg-opacity-50 p-5 ">
                <h1 className="text-white text-4xl">Data Discovering studio</h1>
            </div>
        </div>
    );
}