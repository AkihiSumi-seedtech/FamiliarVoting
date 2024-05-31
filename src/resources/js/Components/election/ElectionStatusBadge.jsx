import { useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

const parseDate = (dateString) => {
    return new Date(dateString)
}

const ElectionStatusBadge = ({ start_date, end_date, initialStatus, electionId, children }) => {
    const { post } = useForm()
    const [status, setStatus] = useState(initialStatus)

    const startDate = isValidDate(start_date) ? parseDate(start_date) : null;
    const endDate = isValidDate(end_date) ? parseDate(end_date) : null;

    function isValidDate(dateString) {
        const isValid = !isNaN(Date.parse(dateString));
        return isValid;
    }

    const handleUpdateElectionStatus = async (electionId, status) => {
        const data = {
            status: status
        };

        try {
            const response = await post(route('admin.update-election-status', electionId) , {
                method: "put",
            });

            if (!response.ok) {
                throw new Error("Failed to update election status");
            }
            console.log('ok')
        } catch (error) {
            console.error("Error updating election status:", error);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date()

            if (now >= startDate && now <= endDate && status === "scheduling") {
                setStatus('running');
                handleUpdateElectionStatus(electionId, status); // scheduling から running になった瞬間にも呼び出す
            } else if (now > endDate && status === "running") {
                setStatus('closed');
                handleUpdateElectionStatus(electionId, status); // running から closed になった瞬間にも呼び出す
                clearInterval(intervalId);
            }
        }, 1000)

        return () => {clearInterval(intervalId);}
    }, [startDate, endDate, status, electionId]);

    return (
        <span className='ml-4 bg-gray-100 text-gray-900 text-sm font-bold py-1 px-2 text-center leading-none align-baseline rounded-sm'>
            {status}
        </span>
    )
}

export default ElectionStatusBadge