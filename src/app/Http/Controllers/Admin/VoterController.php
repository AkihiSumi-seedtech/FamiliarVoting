<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ElectionResource;
use App\Models\Election;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VoterController extends Controller
{
    public function show(Election $election)
    {
        $voter = User::all();

        return Inertia::render('Admin/Voters/index', [
            'election' => new ElectionResource($election),
            'voters' => $voter,
        ]);
    }
}
