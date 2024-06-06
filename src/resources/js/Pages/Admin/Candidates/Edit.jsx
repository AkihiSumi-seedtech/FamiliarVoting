import ElectionLayout from '@/Layouts/ElectionLayout'
import ElectionMuiIcon from '@/Layouts/Navbar/ElectionMuiIcon'
import PageHeader from '@/Layouts/PageHeader'
import { useForm } from '@inertiajs/react'
import React from 'react'

function Edit({ auth, candidate, election }) {
    const { data, setData, post, errors, reset } = useForm({
        candidate_name: candidate.candidate_name || "",
        candidate_party: candidate.candidate_party || "",
        candidate_manifest: candidate.candidate_manifest || "",
        _method: "PUT",
    })

    const onSubmit = (e) => {
        e.preventDefault()

        post(route('admin.candidates.update', candidate.id))
    }
    console.log(election.id)

    return (
        <ElectionLayout
            title="立候補者"
            routeOverview={route('admin.election.index', election.id)}
            routeVoters={route('admin.election.voters.index', election.id)}
            routeResult={route('admin.election.indexAdminResult', election.id)}
            electionId={election.id}
            electionName={election.election_name}
            electionStatus={election.status}
            electionStartDate={election.start_date}
            electionEndDate={election.end_date}
        >
            <div className='py-20'>
                <PageHeader>
                <div className='mr-auto flex-[0_0_33%] max-w-[33%] px-[15px]'>
                            <div className='mb-0 flex'>
                                <ElectionMuiIcon name="candidates" className="text-white mr-3" />
                                <div className='dark:text-white text-lg font-extrabold'>立候補者</div>
                            </div>
                        </div>
                </PageHeader>
            </div>
        </ElectionLayout>
    )
}

export default Edit