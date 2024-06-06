<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\VoterResource;
use App\Imports\UserImport;
use App\Models\Election;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Importer;

class VoterController extends Controller
{
    private $importer;

    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }

    public function index(Election $election)
    {
        $query = User::query();

        $sortField = request("sort_field", 'id');
        $sortDirection = request("sort_direction", "asc");

        if (request("name")) {
            $query->where("name", "like", "%" . request("name") . "%");
        }

        $voters = $election->users()
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return Inertia('Admin/Voters/index', [
            'election' => $election,
            'voters' => VoterResource::collection($voters),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    public function store(Request $request, Election $election)
    {
        DB::beginTransaction();

        try {
            $file = $request->file('file');
            $import = new UserImport($election->id);
            Excel::import($import, $file, null, \Maatwebsite\Excel\Excel::CSV);

            $importedUserIds = $import->getImportedUserIds();
            $election->users()->sync($importedUserIds);

            DB::commit();

            return to_route('admin.election.voters.index', $election->id)
                ->with('success', '投票者のインポートに成功しました！');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'インポート中にエラーが発生しました。: ' . $e->getMessage());
        }
    }

    public function show(User $voter)
    {
        return Inertia('Admin/Voter/index', [
            'voter' => new VoterResource($voter),
        ]);
    }
}
