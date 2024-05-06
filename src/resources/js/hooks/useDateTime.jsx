import React, {useEffect, useState} from 'react'

const useDateTime = () => {
    const [currentDateTime, setCurrentDateTime] = useState();
    const [futureDateTime, setFutureDateTime] = useState();

    useEffect(() => {
        const now = new Date();

        // 現在日時を返す
        let adjustedMinutes = now.getMinutes();
        if (adjustedMinutes < 30) {
            adjustedMinutes = 0;
        } else {
            adjustedMinutes = 0;
            now.setHours(now.getHours() + 1); // 次の時間の0分にする
        }
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(adjustedMinutes).padStart(2, '0');

        const datetimeString = `${year}-${month}-${day}T${hours}:${minutes}`;
        setCurrentDateTime(datetimeString);


        // 1週間後の日時を返す
        const futureDate = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));

        let futureAdjustedMinutes = futureDate.getMinutes();
        if (futureAdjustedMinutes < 30) {
            futureAdjustedMinutes = 0;
        } else {
            futureAdjustedMinutes = 0;
            futureDate.setHours(futureDate.getHours() + 1); // 次の時間の0分にする
        }
        const futureYear = futureDate.getFullYear();
        const futureMonth = String(futureDate.getMonth() + 1).padStart(2, '0');
        const futureDay = String(futureDate.getDate()).padStart(2, '0');
        const futureHours = String(futureDate.getHours()).padStart(2, '0');
        const futureMinutes = String(futureAdjustedMinutes).padStart(2, '0');

        const futureDateTimeString = `${futureYear}-${futureMonth}-${futureDay}T${futureHours}:${futureMinutes}`;
        setFutureDateTime(futureDateTimeString);
    }, [])

    return [ currentDateTime, futureDateTime ]
}

export default useDateTime