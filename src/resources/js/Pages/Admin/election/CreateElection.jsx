import ApplicationLogo from '@/Components/ApplicationLogo';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import CreateElectionButton from '@/Components/elements/CreateElectionButton';
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

function CreateElection() {
    const { data, setData, errors, post } = useForm({
        election_name: "",
        start_date: "",
        end_date: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        post(route("admin.election.store"))
    }

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <Head title='Create Election' />

            <div className='mb-3'>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className='text-5xl font-light'>
                選挙を作成する
            </div>

            <div className="w-full sm:max-w-xl mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg mb-6">
                <div className='p-4'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputLabel htmlFor="election_name" value="選挙名" className='font-extrabold' />

                            <TextInput
                                id="election_name"
                                name="election_name"
                                value={data.election_name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) => setData('election_name', e.target.value)}
                            />

                            {/* <InputError message={errors.email} className="mt-2" /> */}
                        </div>

                        <div className='flex flex-wrap'>
                            <div className="mt-4 basis-1/2 pr-[15px]">
                                <InputLabel htmlFor="start_date" value="開始日" className='font-extrabold' />

                                <TextInput
                                    id="start_date"
                                    type="datetime-local"
                                    name="start_date"
                                    value={data.start_date}
                                    className="mt-1 block w-full"
                                    autoComplete="current-start-date"
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />

                                {/* <InputError message={errors.password} className="mt-2" /> */}
                            </div>

                            <div className="mt-4 basis-1/2 pl-[15px]">
                                <InputLabel htmlFor="end_date" value="終了日" className='font-extrabold' />

                                <TextInput
                                    id="end_date"
                                    type="datetime-local"
                                    name="end_date"
                                    value={data.end_date}
                                    className="mt-1 block w-full"
                                    autoComplete="current-end-date"
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />

                                {/* <InputError message={errors.password} className="mt-2" /> */}
                            </div>
                        </div>


                        <div className="flex items-center justify-center mt-4">
                            <CreateElectionButton>
                                次へ
                            </CreateElectionButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateElection