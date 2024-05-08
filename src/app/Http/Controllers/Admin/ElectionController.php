<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Election;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ElectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $elections = Election::all();
        return Inertia::render('Admin/Dashboard', ['elections' => $elections]);
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
    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'election_name' => 'required|string:max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date'
        ]);

        $election = Election::create($request->all());

        // $electionId = $election->id;
        // return redirect()->route('admin.election.overview', ['id' => $electionId]);

        // return redirect()->route('admin.election.overview', ['election' => $election]);
        return Inertia::render('Admin/election/Overview', [
            'election' => $election
        ]);

        // return Inertia::location(route('admin.election.overview', ['id' => $election->id]));
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
