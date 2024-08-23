export default function VinResult() {
    let NumOfitems = 30
    return (
        <div className="min-h-screen flex justify-center items-center">
            <section className="w-4/5" >
                <h1 className="text-center text-2xl m-4">VIN Result</h1>
                <form className="border-2 border-black p-10 rounded-md flex justify-center">
                    <section className="items-center grid grid-cols-5 gap-4">

                        {Array.from({ length: NumOfitems }).map((_, index) => (
                            <div className="border-2 border-black p-2 px-10">VIN Number <span>s</span> </div>

                        ))}
                    </section>
                </form>
            </section>
        </div>
    )
}