<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreElectionRequest;
use App\Http\Resources\ElectionResource;
use App\Models\Election;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ElectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Election::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('election_name')) {
            $query->where('election_name', 'like', '%' . request('election_name') . '%');
        }
        if (request('status')) {
            $query->where('status', 'like', '%' . request('status') . '%' );
        }

        $elections = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('Admin/Dashboard', [
            'elections' => ElectionResource::collection($elections),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Admin/election/CreateElection', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreElectionRequest $request)
    {
        $data = $request->validated();

        $data['admin_id'] = Auth::id();

        Election::create($data);

        return to_route('admin.election.index')->with('success', 'Election created success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Election $election)
    {
        return Inertia::render('Admin/election/Overview', [
            'election' => $election
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Election $election)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Election $election)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Election $election)
    {
        //
    }
}
