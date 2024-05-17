<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ImportCandidateRequest;
use App\Http\Resources\Admin\CandidateResource;
use App\Imports\CandidatesImport;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Importer;
use Illuminate\Support\Facades\DB;


class CandidateController extends Controller
{
    private $importer;

    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }

    public function index()
    {
        // $candidates = DB::table('candidates')->select('candidate_name', 'candidate_party')->get();

        $query = Candidate::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");

        if (request("candidate_name")) {
            $query->where("candidate_name", "like", "%" . request("candidate_name") . "%");
        }

        $candidates = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return Inertia::render('Admin/Candidates/index', [
            'candidates' => CandidateResource::collection($candidates),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function store(ImportCandidateRequest $request)
    {
        $file = $request->file('file');
        $import = new CandidatesImport($request->election_id);
        Excel::import($import, $file, null, \Maatwebsite\Excel\Excel::CSV);

        return to_route('admin.candidates.index');
    }

    public function show(Candidate $candidate)
    {
        return Inertia('Admin/Candidate/index', [
            'candidate' => new CandidateResource($candidate),
        ]);
    }

    public function import(ImportCandidateRequest $request)
    {
        $file = $request->file('file');
        $import = new CandidatesImport($request->election_id);
        Excel::import($import, $file, null, \Maatwebsite\Excel\Excel::CSV);

        return to_route('admin.candidates.index');
    }
}
