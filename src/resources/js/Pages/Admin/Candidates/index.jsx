import React from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { useForm } from '@inertiajs/react';

const Candidates = ({ candidates, election }) => {
    const { data, setData, post } = useForm({
        file: null
    });
    console.log(election)
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


        post(route('admin.election.candidate.store'), {
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
                    <thead>
                        <tr>

                {/* <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" class="text-center border-b px-6 py-3 bg-gray-50 dark:bg-gray-800">
                                    候補者名
                                </th>
                                <th scope="col" class="text-center border-b border-bpx-6 py-3">
                                    所属
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4">
                                    Silver
                                </td>
                                
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Microsoft Surface Pro
                                </th>
                                <td class="px-6 py-4">
                                    White
                                </td>
                            
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Magic Mouse 2
                                </th>
                                <td class="px-6 py-4">
                                    Black
                                </td>
                                
                            </tr>
                            <tr class="border-b border-gray-200 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Google Pixel Phone
                                </th>
                                <td class="px-6 py-4">
                                    Gray
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                    Apple Watch 5
                                </th>
                                <td class="px-6 py-4">
                                    Red
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}

                        </tr>
                    </thead>
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

// Candidates.layout = page => <ElectionLayout title="立候補者" children={page} />;

export default Candidates;
