import React, { useState } from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import CandidateCard from './CandidateCard';

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
            <div>
                <input id='file' type='file' name='file' onChange={handleFileChange} />
                <button className="bg-orange-600 py-4 w-32 mt-4 items-center justify-center rounded-lg font-bold"
                type='submit' value={data.file} onClick={handleImport}>
                    
                    Upload</button>
                    
            </div>
            <CandidateCard candidates={candidates} />

        </div>
    );
};

Candidates.layout = page => <ElectionLayout title="立候補者" children={page} />;

export default Candidates;
