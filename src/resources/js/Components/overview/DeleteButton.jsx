import React from 'react';

const DeleteButton = ({ onDelete, election }) => {
    const handleDelete = () => {
        // ダイアログを表示し、OK が選択されたら onDelete を呼び出す
        if (window.confirm('本当に削除しますか？')) {
            onDelete(election);
        }
    };

    return (
        <button onClick={handleDelete}>削除</button>
    );
};

export default DeleteButton;
