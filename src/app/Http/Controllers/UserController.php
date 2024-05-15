<?php

namespace App\Http\Controllers;

use App\Imports\UserImport;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Validators\ValidationException;

class UserController extends Controller
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function index()
    {
        $users = User::get();

        return Inertia::render('Admin/Voters/index', [
            'users' => $users,
        ]);
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function import(Request $request)
    {
        try {
            if ($request->hasFile('empty')) {
                switch ($request->file('empty')->clientExtension()) {
                    case "csv":
                        Excel::import(new UserImport, $request->file('empty'));
                        return redirect('./')->with('success', 'All good!');
                    default:
                        throw new \Exception('Invalid file format');
                }
            }
        }
        catch(Exception $e) {
            return redirect('./')->with('error',$e->getMessage());
        }
        catch(ValidationException $ve) {
            return redirect('/')->with('error',$ve->failures());
        }
    }
}
