import React from 'react';

const VoterDetail = ({ manifestMapping, selectedCandidate }) => {
    return (
        <div>
            {selectedCandidate && manifestMapping[selectedCandidate] && (
                <div>
                    <p>{selectedCandidate}</p>
                    <p>{manifestMapping[selectedCandidate]}</p>
                </div>
            )}
        </div>
    );
}

export default VoterDetail;
