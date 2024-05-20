import React from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { useForm } from '@inertiajs/react';

const Candidates = ({ candidates, election }) => {
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

        post(route('admin.election.candidate.store', election), {
            onSuccess: () => {
                console.log("成功!")
            }
        });
    };

    return (
        <ElectionLayout
            title="立候補者"
            routeOverview={route('admin.election.index')}
        >
            <div>
                <div>
                    <input id='file' type='file' name='file' onChange={handleFileChange} />
                    <button type='submit' value={data.file} onClick={handleImport}>Upload</button>
                </div>
                <h1>候補者一覧</h1>
                <table>
                    <tbody>
                        {candidates.data.map(candidate => (
                            <tr key={candidate.id}>
                                <td>{candidate.candidate_name}</td>
                                <td>{candidate.candidate_party}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ElectionLayout>
    );
};

export default Candidates;
