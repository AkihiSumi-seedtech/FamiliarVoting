import React from 'react';

const DeleteButton = ({ onDelete, election }) => {
    const handleDelete = () => {
        onDelete(election); // onDelete に election を渡して削除処理を呼び出す
        console.log('クリック'); // クリック時にコンソールにログを出力
    };

    return (
        <button onClick={handleDelete}>削除</button>
    );
};

export default DeleteButton;
