import React, { useState } from "react";
const MyDealsData = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [option, setOption] = useState("");
    const formatDate = (date) => {
        if (!date) return "";
        const [year, month, day] = date.split("-");
        return `${month}-${day}-${year}`;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Start Date:", formatDate(startDate));
        console.log("End Date:", formatDate(endDate));
        console.log("Selected Option:", option);
    };
    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setOption("");
    };
    return (
        <div className="p-2">
            <div className="flex justify-between items-center w-full">
                <span className="text-xl font-bold text-blue-900 mx-auto">My Deals Data</span>
            </div>
            <form
                className="conditionsNav p-2 m-2 border border-black rounded-md flex justify-start lg:justify-center items-center gap-1 flex-wrap"
                onSubmit={handleSubmit}
            >
                <div>
                    <label className="px-1 font-medium" htmlFor="start-date">Start Date:</label>
                    <input
                        className="border border-black rounded p-1 w-32"
                        type="date"
                        id="start-date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="end-date">End Date:</label>
                    <input
                        className="border border-black rounded p-1 w-32"
                        type="date"
                        id="end-date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div>
                    <label className="px-1 font-medium" htmlFor="option">Option:</label>
                    <select
                        className="border border-black rounded p-1 w-32"
                        id="option"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Scorecard">Scorecard</option>
                        <option value="Decision">Decision</option>
                        <option value="Bureau">Bureau</option>
                        <option value="DecisionRules">Decision Rules</option>
                    </select>
                </div>
                <button type="submit" className="rounded-full p-2 mx-2 border border-black">
                    Submit
                </button>
                <button type="button" onClick={handleReset} className="rounded-full p-2 mx-2 border border-black">
                    Reset
                </button>
            </form>
        </div>
    );
};
export default MyDealsData;