<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Candidates;
use Illuminate\Http\Request;
use Inertia\Inertia;



class CandidatesController extends Controller
{
    public function candidates()
    {
    
        $candidates = Candidates::all();

        return Inertia::render('Admin/Candidates', [
            'candidates' => $candidates,
        ]);
    }
}
