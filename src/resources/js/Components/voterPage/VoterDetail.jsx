import React, { useState } from 'react';
import ShowDetail from './ShowDetail';

const VoterDetail = ({ candidates }) => { // candidates プロパティを受け取る
    // console.log(candidates)
    const [showDetail, setShowDetail] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const handleClick = (candidateId) => { // 候補者の ID を受け取る
        setShowDetail(!showDetail); // showDetail の値を反転させる
        setSelectedCandidate(candidateId); // 選択された候補者の ID をセットする
    };

    return (
        <div>
            <button onClick={() => handleClick(selectedCandidate)}>政策を見る</button> {/* クリック時に選択された候補者の ID を渡す */}
            {showDetail && <ShowDetail detail={candidates.find(candidate => candidate.id === selectedCandidate)} />} {/* showDetail が true のときにのみ ShowDetail コンポーネントを表示 */}
        </div>
    );
};

export default VoterDetail;
