<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\CandidateResource;
use App\Models\Candidate;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function index()
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
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
