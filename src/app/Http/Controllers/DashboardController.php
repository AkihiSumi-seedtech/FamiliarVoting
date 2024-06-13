<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ElectionResource;
use App\Models\Election;

class DashboardController extends Controller
{
    /**
     * Display a listing of the voter resource.
     */
    public function voterIndex()
    {
        $user = auth()->user();

        $usersElections = $user->elections;
        $usersElections->load('votes');

        $votedElections = [];
        $unVotedElections = [];

        foreach ($usersElections as $election) {
            // Check if the voter has cast a vote for this election
            if ($election->votes->where('voter_id', $user->id)->count() > 0) {
                $votedElections[] = $election;
            } else {
                $unVotedElections[] = $election;
            }
        }

        $votedElectionsResource = ElectionResource::collection($votedElections);
        $unVotedElectionsResource = ElectionResource::collection($unVotedElections);

        // dd($usersElections);
        // dd($votedElections);
        // dd($unVotedElections);

        return inertia('User/Dashboard', [
            'usersElections' => ElectionResource::collection($usersElections),
            'votedElections' => $votedElectionsResource,
            'unVotedElections' => $unVotedElectionsResource,
        ]);
    }

    /**
     * Display a listing of the admin resource.
     */
    public function adminIndex()
    {
        $user = auth()->user();
        $elections = Election::where('admin_id', $user->id)
            ->get();

        // dd($elections);

        return inertia('Admin/Dashboard', [
            'elections' => ElectionResource::collection($elections),
        ]);
    }
}
