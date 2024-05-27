import AutoUpdate from "./AutoUpdate";

function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

function ElectionCard({ electionName, electionStatus, electionStartDate, electionEndDate, electionId }) {
    const formattedStartDate = formatDateTime(electionStartDate);
    const formattedEndDate = formatDateTime(electionEndDate);

    return (
        <button id="main" className="p-2 justify-around flex items-center ml-32 h-48 w-480 bg-white-200 border-solid border-2 border-bg-slate-500 rounded-lg">
            <div>
                <div className="border-solid border-2 border-gray bg-white py-4 w-80 flex flex-col rounded-lg font-bold">
                    {electionName}
                </div>

                <div className="bg-green-400 py-4 w-32 mt-4 flex flex-col items-center justify-center rounded-lg font-bold">
                    <AutoUpdate 
                    initialStatus={electionStatus} 
                    start_date={formattedStartDate} 
                    end_date={formattedEndDate} 
                    electionId={electionId}
                    
                    />
                </div>
            </div>

            <div className="flex">
                <div className="border-solid border-2 border-gray bg-white py-0.3 w-32 ml-4 mr-4 rounded-lg font-bold">
                    <div className="w-32 mt-5 flex flex-col font-bold text-sm">【開始日】</div>
                    {formattedStartDate}
                </div>
                <div className="border-solid border-2 border-gray bg-white py-0.3 w-32 ml-4 mr-4 rounded-lg font-bold">
                    <div className="w-32 mt-5 flex flex-col font-bold text-sm">【終了日】</div>
                    {formattedEndDate}
                </div>
            </div>
        </button>
    );
}

export default ElectionCard;
