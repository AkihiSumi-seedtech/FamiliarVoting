<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoteRequest;
use App\Http\Resources\Admin\CandidateResource;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\Vote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function index(Election $election)
    {
        $query = Candidate::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("candidate_name")) {
            $query->where("candidate_name", "like", "%" . request("candidate_name") . "%");
        }

        $candidates = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return Inertia('User/Voting/index', [
            'candidates' => CandidateResource::collection($candidates),
            'election_id' => $election->id,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /// 投票機能
    public function store(StoreVoteRequest $request, Election $election)
    {
        $data = $request->validate();

        $data['voter_id'] = Auth::id();

        $candidateId = $request->route('candidateId');
        $candidate = Candidate::find($candidateId);
        $data['candidate_id'] = $candidate->id;

        $data['election_id'] = $election->id;

        Vote::create($data);
    }

    /// 投票機能
    public function voting(Request $request, Candidate $candidate, Election $election)
    {
        $data = $request->validate();

        $data['voter_id'] = Auth::id();
        $data['candidate_id'] = $candidate->id;
        $data['election_id'] = $election->id;

        Vote::create($data);

        return Inertia('User/Thanks')->with('success', 'You have voted.');
    }
}
