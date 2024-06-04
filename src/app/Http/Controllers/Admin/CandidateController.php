<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CandidateResource;
use App\Imports\CandidatesImport;
use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Importer;


class CandidateController extends Controller
{
    private $importer;

    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }

    public function index(Election $election)
    {
        $query = Candidate::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request("candidate_name")) {
            $query->where("candidate_name", "like", "%" . request("candidate_name") . "%");
        }

        $candidates = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return Inertia('Admin/Candidates/index', [
            'candidates' => CandidateResource::collection($candidates),
            'election' => $election,
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function store(Request $request, Election $election)
    {
        $file = $request->file('file');
        $import = new CandidatesImport($election->id);
        Excel::import($import, $file, null, \Maatwebsite\Excel\Excel::CSV);

        return to_route('admin.election.candidates.index', $election->id)
            ->with('success', '立候補者のインポートに成功しました！');
    }

    public function show(Candidate $candidate)
    {
        return Inertia('Admin/Candidate/index', [
            'candidate' => new CandidateResource($candidate),
        ]);
    }
}
