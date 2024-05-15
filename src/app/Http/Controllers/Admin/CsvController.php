<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\UserImport;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Importer;

class CsvController extends Controller
{
    private $importer;

    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }

    public function index()
    {
        $users = User::get();

        return Inertia::render('Admin/Voters/index', [
            'users' => $users,
        ]);
    }

    public function import(Request $request)
    {
        $file = $request->file('file');
        $import = new UserImport();
        Excel::import($import, $file, null, \Maatwebsite\Excel\Excel::CSV);

        return to_route('admin.voters.index');
    }
}
