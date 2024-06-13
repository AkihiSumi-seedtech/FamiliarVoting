<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoteRequest;
use App\Http\Resources\Admin\CandidateResource;
use App\Models\Election;
use App\Models\Vote;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
    public function index(Election $election)
    {
        $candidates = $election->candidates()
            ->paginate(10);

        return Inertia('User/Voting/index', [
            'candidates' => CandidateResource::collection($candidates),
            'election' => $election,
        ]);
    }

    /// 投票機能
    public function store(StoreVoteRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            Vote::create($data);
        });

        return Inertia('User/Voting/Thanks');
    }

    // 投票者側で結果を閲覧
    public function showVoterResult(Election $election)
    {
        $result = DB::table('votes')
            ->select('elections.election_name', 'candidates.candidate_party', 'candidates.candidate_name', 'votes.candidate_id', DB::raw('COUNT(votes.candidate_id) as count'))
            ->leftJoin('candidates', 'votes.candidate_id', '=', 'candidates.id')
            ->leftJoin('elections', 'votes.election_id', '=', 'elections.id')
            ->where('votes.election_id', $election->id)
            ->whereNotNull('votes.candidate_id')
            ->groupBy('elections.election_name', 'candidates.candidate_name', 'votes.candidate_id')
            ->orderByDesc('count')
            ->get();

        // dd($result);

        return Inertia('User/Result/index', [
            'result' => $result,
        ]);
    }

    // 管理者側で結果を閲覧
    public function showAdminResult(Election $election)
    {
        $result = DB::table('votes')
            ->select('elections.election_name', 'candidates.candidate_party', 'candidates.candidate_name', 'votes.candidate_id', DB::raw('COUNT(votes.candidate_id) as count'))
            ->leftJoin('candidates', 'votes.candidate_id', '=', 'candidates.id')
            ->leftJoin('elections', 'votes.election_id', '=', 'elections.id')
            ->where('votes.election_id', $election->id)
            ->whereNotNull('votes.candidate_id')
            ->groupBy('elections.election_name', 'candidates.candidate_name', 'votes.candidate_id')
            ->orderByDesc('count')
            ->get();

        return Inertia('Admin/Result/index', [
            'election' => $election,
            'results' => $result,
            'votes' => Vote::count(),
        ]);
    }
}
