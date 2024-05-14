<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    public function candidates()
    {

        $candidates = Candidate::all();

        return Inertia::render('Admin/Candidates/index', [
            'candidates' => $candidates,
        ]);
    }
}
