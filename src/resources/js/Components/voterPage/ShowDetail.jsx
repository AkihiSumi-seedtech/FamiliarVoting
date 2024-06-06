import React from 'react';

const ShowDetail = ({ detail }) => {
    console.log(detail);
    return (
        <div>
            {detail && detail.map(manifest => (
                <div key={manifest.id}>
                    <p>{manifest.candidate_manifest}</p>
                </div>
            ))}
        </div>
    );
};

export default ShowDetail;
