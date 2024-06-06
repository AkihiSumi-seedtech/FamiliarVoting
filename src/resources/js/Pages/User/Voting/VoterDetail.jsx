import React from 'react';

const VoterDetail = ({ manifestMapping }) => {
    return (
        <div>
            {Object.entries(manifestMapping).map(([candidateId, manifest]) => (
                <div key={candidateId}>
                    <p>{`候補者 ${candidateId} のマニフェスト:`}</p>
                    <p>{manifest}</p>
                </div>
            ))}
        </div>
    );
}

export default VoterDetail;
