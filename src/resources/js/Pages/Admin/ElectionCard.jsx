function ElectionCard({ electionName, electionStatus, electionStartDate, electionEndDate}) {
    return (
        <button id="main" className="p-2 justify-around flex items-center ml-32 h-48 w-480  bg-white-200 border-solid border-2 border-bg-slate-500 rounded-lg">
            <div>
                <div className="border-solid border-2 border-gray bg-white py-4 w-80 flex flex-col rounded-lg font-bold">
                    {electionName}
                </div>

                <div className="bg-green-400 py-4 w-32 mt-4 flex flex-col items-center justify-center rounded-lg font-bold">
                    {electionStatus}
                </div>

            </div>

            <div className="flex">
                <div className="border-solid border-2 border-gray bg-white py-0.3 w-32 ml-4 mr-4 rounded-lg font-bold">
                    <div className="w-32 mt-10 flex flex-col font-bold">開始日</div>
                    {electionStartDate}
                </div>
                <div className="border-solid border-2 border-gray bg-white py-0.3 w-32  ml-4 mr-4 rounded-lg font-bold">
                    <div className="w-32 mt-10 flex flex-col font-bold">終了日</div>
                    {electionEndDate}
                </div>
            </div>
        </button>
    );
}

export default ElectionCard