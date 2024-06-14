<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateCandidateRequest;
use App\Http\Resources\Admin\CandidateResource;
use App\Imports\CandidatesImport;
use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $query = $election->candidates();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request("candidate_name")) {
            $query->where("candidate_name", "like", "%" . request("candidate_name") . "%");
        }

        if (request("candidate_party")) {
            $query->where("candidate_party", "like", "%" . request("candidate_party") . "%");
        }

        $candidates = $query
            ->orderBy($sortField, $sortDirection)
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
        DB::beginTransaction();

        try {
            $file = $request->file('file');
            $import = new CandidatesImport($election->id);
            Excel::import($import, $file, null, \Maatwebsite\Excel\Excel::CSV);

            $importedCandidateIds = $import->getImportedCandidateIds();
            $election->candidates()->syncWithoutDetaching($importedCandidateIds);

            DB::commit();

            return to_route('admin.election.candidates.index', $election->id)
                ->with('success', '立候補者のインポートに成功しました！');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'インポート中にエラーが発生しました。: ' . $e->getMessage());
        }
    }

    public function update(UpdateCandidateRequest $request, Candidate $candidate)
    {
        $data = $request->validated();
        $candidate->update($data);
    }

    public function destroy(Candidate $candidate, Election $election)
    {
        $name = $candidate->candidate_name;

        DB::beginTransaction();

        try {
            $candidate->elections()->detach($election->id);
            $candidate->elections()->delete();

            DB::commit();

            return to_route('admin.election.candidates.index', $election->id)
                ->with('success', $name . 'さんを削除しました。');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', '削除中にエラーが発生しました。: ' . $e->getMessage());
        }
    }
}
