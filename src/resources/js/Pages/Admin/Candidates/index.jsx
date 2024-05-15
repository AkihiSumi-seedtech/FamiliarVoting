import React from 'react'
import ElectionLayout from '@/Layouts/ElectionLayout'
import { useForm } from '@inertiajs/react'


const Candidates = () => {
    const {data, setData } =useForm({
        file: null
    })
   
    const handleFileChange= (e) => {
        
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
            <input id ='file' type='file' name ='file' onChange={handleFileChange} />
            <button tyoe='submit' value={data.file} onClick={handleImport}>Upload</button>
        </div>
    );
};

Candidates.layout = page => <ElectionLayout title="立候補者" children={page} />
export default Candidates