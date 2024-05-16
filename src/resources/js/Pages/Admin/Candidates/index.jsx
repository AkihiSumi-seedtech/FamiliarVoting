import React, { useState, useEffect } from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import axios from 'axios';

const Candidates = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await axios.get('/admin/fetch-candidates'); 
            setCandidates(response.data);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    };

    return (
        <div>
            <h2>Candidates:</h2>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate.id}>{candidate.name}</li>
                ))}
            </ul>
        </div>
    );
};

Candidates.layout = page => <ElectionLayout title="立候補者" children={page} />;
export default Candidates;
