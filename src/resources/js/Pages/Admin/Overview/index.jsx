import LaunchButton from '@/Components/overview/LaunchButton'
import ElectionLayout from '@/Layouts/ElectionLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'

const Overview = ({ election }) => {
    const { post } = useForm();

    console.log(election)

    const handleLaunch = async (e) => {
        e.preventDefault()

        try {
            const response = await post(route('admin.launch-election', election), {
                method: 'put', // PUTメソッドを指定
            })
            if (response.status === 200) {
                // 成功処理
                console.log('選挙が開始されました。')
                handleClose(); // ダイアログを閉じる
            } else {
                // 失敗処理
                console.error('選挙の開始に失敗しました。')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ElectionLayout
            title='概要'
            routeCandidate={route('admin.election.candidate.index', election)}
        >
            <div>
                <LaunchButton launchElection={handleLaunch} />
            </div>
        </ElectionLayout>
    )
}

// Overview.layout = page => <ElectionLayout title="概要" children={page} />

export default Overview