<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\CandidatesImport;
use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Importer;

class CandidateController extends Controller
{
    private $importer;

    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }

    public function index()
    {
        $candidates = Candidate::get();

        return Inertia::render('Admin/Candidates/index', [
            'candidats' => $candidates,
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
