<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreElectionRequest;
use App\Http\Resources\ElectionResource;
use App\Models\Admin;
use App\Models\Election;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ElectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Election::query();

        if (request("election_name")) {
            $query->where("election_name", "like", "%" . request("election_name") . "%");
        }
        if (request("status")) {
            $query->where("status", request("status"));
        }

        $elections = $query->paginate(10);

        return inertia('Admin/Dashboard', [
            'elections' => ElectionResource::collection($elections),
            'title' => 'Dashboard',
        ]);
        // $elections = ElectionResource::all();
        // return Inertia::render('Admin/Dashboard', ['elections' => $elections]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/election/CreateElection');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreElectionRequest $request)
    {
        $data = $request->validate();

        $data['admin_id'] = Auth::id();

        Election::create($data);

        return to_route('admin.election.index')
            ->with('success', 'Election was created');
        // Validator::make($request->all(), [
        //     'election_name' => 'required|string:max:255',
        //     'start_date' => 'required|date',
        //     'end_date' => 'required|date'
        // ])->validate();

        // $election = Election::create($request->all());

        // return to_route('admin.election.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Election $election)
    {
        return Inertia::render('Admin/election/Overview', [
            'election' => new ElectionResource($election),
            'success' => session('success'),
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
