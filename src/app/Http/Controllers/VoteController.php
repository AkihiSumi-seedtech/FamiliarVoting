<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVoteRequest;
use App\Http\Resources\Admin\CandidateResource;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
            'election' => $election,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function indexResult(Election $election)
    {
        $result = DB::table('votes')
            ->select('candidate_id', 'is_chose_not_select', DB::raw('COUNT(*) as count'))
            ->whereNotNull('candidate_id')
            ->orWhere('is_chose_not_select', 1)
            ->groupBy('candidate_id', 'is_chose_not_select')
            ->orderBy('count', 'DESC')
            ->get();

        //dd($result);

        return Inertia::render('Admin/Result/index', [
            'result' => $result,
            'election' => $election,
        ]);
    }

    /// 投票機能
    public function store(StoreVoteRequest $request)
    {
        $data = $request->validated();

        // 投票したか否かの判定ステータスを変更
        $userId = Auth::id();
        $user = User::where('id', $userId)->first();

        DB::transaction(function () use ($data, $user) {
            Vote::create($data);
            $user->update(['is_voted' => true]);
        });

        return Inertia('User/Voting/Thanks')->with('success', 'You have voted.');
    }
}
