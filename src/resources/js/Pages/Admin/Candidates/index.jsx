import React, { useState } from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { useForm } from '@inertiajs/react';

const Candidates = ({ candidates }) => {
    const { data, setData } = useForm({
        file: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
        }
    };

    const handleImport = (e) => {
        e.preventDefault();
        if (!data.file) {
            alert('ファイルを選択してください');
            return;
        }

        const formData = new FormData();
        formData.append('file', data.file);

        fetch(route('admin.candidates.import'), {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        })
        .then(response => {
            if (response.ok) {
                console.log('Success!');
            } else {
                console.error('Failed to import candidates');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <h1>Candidates</h1>
            <ul>
                {candidates.map(candidate => (
                    <li key={candidate.id}>{candidate.name} - {candidate.email}</li>
                ))}
            </ul>
            <input id='file' type='file' name='file' onChange={handleFileChange} />
            <button 
                className="bg-blue-400 py-4 w-32 mt-4  items-center justify-center rounded-lg font-bold"
                type='button' onClick={handleImport}
            >
                Upload
            </button>
        </div>
    );
};

Candidates.layoute = page => <ElectionLayout title="Candidates">{page}</ElectionLayout>;
export default Candidates;
