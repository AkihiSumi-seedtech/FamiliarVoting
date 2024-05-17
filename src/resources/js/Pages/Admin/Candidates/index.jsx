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
            <div>
                <input id='file' type='file' name='file' onChange={handleFileChange} />
                <button className="bg-orange-600 py-4 w-32 mt-4 items-center justify-center rounded-lg font-bold"
                type='submit' value={data.file} onClick={handleImport}>
                    
                    Upload</button>
            </div>
            <h1>候補者一覧</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col" class="text-center  border-t border-b border-l border-r border-gray-300 rpx-6 py-3 bg-gray-200">
                            立候補者名
                        </th>
                        <th scope="col" class="text-center border-t border-b border-l border-r border-gray-300 px-6 py-3 bg-gray-200">
                            所属
                        </th>
                        <th scope="col" class="text-center border-t border-b border-l border-r border-gray-300 px-6 py-3 bg-gray-200">
                            出馬選挙名
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {candidates.map(candidate => (
                        <tr className='border-l border-r border-b border-gray-300' key={candidate.can_id}>
                            <td className='text-center  border-r border-gray-300'>{candidate.can_name}</td>
                            <td className='text-center border-gray-300'>{candidate.can_party}</td>
                            <td className='border-l border-gray-300'>  </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Candidates.layout = page => <ElectionLayout title="立候補者" children={page} />;

export default Candidates;
