import { useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'

const parseDate = (dateString) => {
    return new Date(dateString)
}

const ElectionStatusBadge = ({ start_date, end_date, initialStatus, electionId }) => {
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
            await post(route('admin.update-election-status', electionId), data, {
                method: "put",
            });
        } catch (error) {
            console.error("Error updating election status:", error);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date()

            if (now >= startDate && now <= endDate && status === "Scheduling") {
                setStatus('Running');
                handleUpdateElectionStatus(electionId, status); // Scheduling から running になった瞬間にも呼び出す
            } else if (now > endDate && status === "Running") {
                console.log(endDate)
                setStatus('Closed');
                handleUpdateElectionStatus(electionId, status); // running から closed になった瞬間にも呼び出す
                clearInterval(intervalId);
            }
        }, 1000)

        return () => {clearInterval(intervalId);}
    }, [startDate, endDate, status, electionId]);

    if (status === 'Building') {
        return (
            <span className='ml-4 bg-gray-100 text-gray-900 text-sm font-bold py-1 px-2 text-center leading-none align-baseline rounded-sm'>
                {status}
            </span>
        )
    }

    if (status === 'Scheduling') {
        return (
            <span className='ml-4 bg-amber-300 text-gray-900 text-sm font-bold py-1 px-2 text-center leading-none align-baseline rounded-sm'>
                {status}
            </span>
        )
    }

    if (status === 'Running') {
        return (
            <span className='ml-4 bg-emerald-300 text-gray-900 text-sm font-bold py-1 px-2 text-center leading-none align-baseline rounded-sm'>
                {status}
            </span>
        )
    }

    if (status === 'Closed') {
        return (
            <span className='ml-4 bg-red-600 text-gray-100 text-sm font-bold py-1 px-2 text-center leading-none align-baseline rounded-sm'>
                {status}
            </span>
            
        )
    }
}

export default ElectionStatusBadge