import ElectionLayout from '@/Layouts/ElectionLayout';
import React, { useEffect } from 'react';
import PieChart from '@/Components/result/PieChart';
import PageHeader from '@/Layouts/PageHeader';
import ElectionMuiIcon from '@/Layouts/Navbar/ElectionMuiIcon';

const Result = ({ votes, election, results, electionId }) => {
    const filteredResults = results.filter(
        result => result.election_id === electionId
    )

    console.log(election)

    // chartDataを定義する
    const chartData = filteredResults.map(result => ({
        name: result.candidate_name,
        value: result.count,
        party: result.candidate_party,
    }));

    // 選挙が終了していない場合にアラートを表示
    useEffect(() => {
        if (election.status !== 'Closed') {
            // アラートを表示
            alert('この選挙はまだ終了していません。\n 投票結果は選挙期間終了後に可能になります。');
            // 概要ページに遷移
            window.location.href = route('admin.election.show', election.id);
        } else if (filteredResults.length === 0) {
            // 結果がない場合にアラートを表示
            alert('投票結果該当なし');
        }
    }, [election.status, filteredResults.length]);

    return (
        <ElectionLayout
            title='結果'
            routeVoters={route('admin.election.voters.index', election.id)}
            routeOverview={route('admin.election.show', election.id)}
            routeCandidate={route('admin.election.candidates.index', election.id)}
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
                            <ElectionMuiIcon name="result" className='dark:text-white mr-3' />
                            <div className='dark:text-white text-lg font-extrabold'>結果</div>
                        </div>
                    </div>
                </PageHeader>
                <div className='max-w-7xl sm:px-6 lg:px-8'>
                    <div className='overflow-hidden shadow-sm'>
                        {election.status === 'Closed' && (
                            <div className='flex flex-wrap justify-center dark:text-gray-300'>
                                <div className='basis-0 grow max-w-full'>
                                    <div className='flex flex-col relative min-w-0 rounded-[3px] border border-solid bg-clip-border'>
                                        <h4 className='font-base font-bold border-b border-solid py-4 px-8 mb-0 leading-5'>立候補者</h4>
                                        <div className='border-none flex-auto p-4'>
                                            <div className='flex flex-wrap'>
                                                <div className='basis-0 grow max-w-full px-[15px]'>
                                                    <table className='w-full max-w-full mb-4 bg-transparent border border-solid'>
                                                        <thead className='border-b-4 border-solid'>
                                                            <tr className='text-nowrap'>
                                                                <th className='p-3 border'>
                                                                    氏名
                                                                </th>
                                                                <th className='p-3 w-[20%]'>
                                                                    得票数
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <thead>
                                                            <tr>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {filteredResults.map((result, index) => (
                                                                <tr className='border-b text-center' key={index}>
                                                                    <td className='p-3 border'>{result.candidate_name}</td>
                                                                    <td className='p-3 w-[20%]'>{result.count}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    投票総数 : {votes}
                                                </div>
                                                <div className='basis-0 grow max-w-full'>
                                                    <div className='relative w-full h-[300px]'>
                                                        {/* <div className='absolute overflow-hidden'></div> */}
                                                        <PieChart chartData={chartData} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ElectionLayout>
    );
};

export default Result;
