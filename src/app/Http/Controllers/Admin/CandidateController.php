<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\CandidatesImport;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class CandidateController extends Controller
{
    public function index()
    {

        $candidates = Candidate::all();

        return Inertia::render('Admin/Candidates/index', [
            'candidates' => $candidates,
        ]);
    }
    public function import(Request $request)
    {
        $file =$request -> file('file');
        $import =new CandidatesImport();
        Excel::import($import, $file, null,\Maatwebsite\Excel\Excel::CSV);

        return to_route('admin.candidates.index');
    }

}
