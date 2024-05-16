<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\CandidatesImport;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Importer;
use Illuminate\Support\Facades\DB;


class CandidateController extends Controller
{
    private $importer;

    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }

    public function index()
    {
        $candidates = \DB::table('candidates')->select('can_name', 'can_party')->get();
    
        return Inertia::render('Admin/Candidates/index', [
            'candidates' => $candidates,
        ]);
    }
    

    public function import(Request $request)
    {
        $file = $request->file('file');
        $import = new CandidatesImport();
        Excel::import($import, $file, null, \Maatwebsite\Excel\Excel::CSV);

        return to_route('admin.candidates.index');
    }
}
