import React from 'react';

const VoterDetail = ({ manifestMapping }) => {
    return (
        <div>
            {Object.entries(manifestMapping).map(([candidateId, manifest]) => (
                <div key={candidateId}>
                    <p>{candidateId} </p>
                    <p>{manifest}</p>
                </div>
            ))}
        </div>
    );
}

export default VoterDetail;
