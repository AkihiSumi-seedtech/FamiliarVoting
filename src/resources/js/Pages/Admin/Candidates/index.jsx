import React, { useState } from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

const Candidates = ({ candidates }) => {
    const { data, setData, post } = useForm({
        file: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({ file: file });
        }
    };

    const handleImport = (e) => {
        e.preventDefault();
        if (!data.file) {
            alert('ファイルを選択してください');
            return;
        }


        post(route('admin.candidates.import'), {
            onSuccess: () => {
                console.log("成功!")
            }
        });
    };

    return (
        <div>
            {/* CSV ファイルのアップロードフォーム */}
            <div>
                <input id='file' type='file' name='file' onChange={handleFileChange} />
                <button type='submit' value={data.file} onClick={handleImport}>Upload</button>
            </div>

            {/* 候補者情報の表示 */}
            <h1>候補者一覧</h1>
            <table>
                <thead>
                    <tr>
                        <th>立候補者名</th>
                        <th>所属</th>
                    </tr>
                </thead>
                <tbody>
                    {candidates.map(candidate => (
                        <tr key={candidate.can_id}>
                            <td>{candidate.can_name}</td>
                            <td>{candidate.can_party}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Candidates.layout = page => <ElectionLayout title="立候補者" children={page} />;

export default Candidates;
