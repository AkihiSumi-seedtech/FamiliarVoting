<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\VoterResource;
use App\Imports\UserImport;
use App\Models\Election;
use App\Models\User;
use Illuminate\Http\Request;
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

        $voters = $query->orderBy($sortField, $sortDirection)
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
        $file = $request->file('file');
        $import = new UserImport($election->id);
        Excel::import($import, $file, null, \Maatwebsite\Excel\Excel::CSV);

        return to_route('admin.election.voters.index', $election->id)
            ->with('success', '投票者をインポートに成功しました！');
    }

    public function show(User $voter)
    {
        return Inertia('Admin/Voter/index', [
            'voter' => new VoterResource($voter),
        ]);
    }
}
