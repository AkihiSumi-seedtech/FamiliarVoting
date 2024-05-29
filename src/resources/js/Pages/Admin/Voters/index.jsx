import ElectionLayout from '@/Layouts/ElectionLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'

const Voters = ({ voters, election }) => {
    const { data, setData, post } = useForm({
        file: null
    })

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData({ file: file });
        }
    }

    const handleImport = (e) => {
        e.preventDefault()

        if (!data.file) {
            alert('ファイルを選択してください')
            return
        }

        post(route('admin.election.voters.store', election), {
            onSuccess: () => {
                console.log("成功!")
            }
        })
    }

    return (
        <ElectionLayout
            title="投票者"
            routeOverview={route('admin.election.show', election)}
            routeCandidate={route('admin.election.candidates.index', election)}
            routeResult={route('admin.indexAdminResult', election)}
        >
            <div>
                <input id='file' type='file' name='file' onChange={handleFileChange} />
                <button
                    className="bg-orange-600 py-4 w-32 mt-4 items-center justify-center rounded-lg font-bold"
                    type='submit'
                    value={data.file}
                    onClick={handleImport}
                >
                    Upload
                </button>

                {!voters.data.length && (
                    <div className='mt-10 text-center'>
                        <p className='text-xl font-medium mb-4'>まだ投票者をアップロードしていないようです。</p>
                        <p className='text-xl font-medium mb-4'>投票者をアップロードしましょう。</p>
                    </div>
                )}
            </div>
        </ElectionLayout>
    )
}

export default Voters