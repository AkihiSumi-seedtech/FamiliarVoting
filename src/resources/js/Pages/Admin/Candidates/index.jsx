import React, { useState } from 'react';
import ElectionLayout from '@/Layouts/ElectionLayout';
import { useForm } from '@inertiajs/react';

const Candidates = () => {
    const [fileContent, setFileContent] = useState(null); // State to store file content
    const { data, setData, post } = useForm({
        file: null
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('file', file);
            readFileContent(file); // Read file content when file is selected
        }
    };

    const readFileContent = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            setFileContent(content); // Set file content to state
        };
        reader.readAsText(file);
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
            <input id='file' type='file' name='file' onChange={handleFileChange} />
            <button type='submit' value={data.file} onClick={handleImport}>Upload</button>
            {fileContent && (
                <div>
                    <h2>Uploaded File Content:</h2>
                    <pre>{fileContent}</pre>
                </div>
            )}
        </div>
    );
};

Candidates.layout = page => <ElectionLayout title="立候補者" children={page} />;
export default Candidates;
