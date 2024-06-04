<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ElectionResource;
use App\Models\Election;
use Illuminate\Support\Facades\Auth;


class DashboardController extends Controller
{
    /**
     * Display a listing of the voter resource.
     */
    public function voterIndex()
    {
        $query = Election::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('election_name')) {
            $query->where('election_name', 'like', '%' . request('election_name') . '%');
        }
        if (request('status')) {
            $query->where('status', 'like', '%' . request('status') . '%' );
        }

        $elections = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        return inertia('User/Dashboard', [
            'elections' => ElectionResource::collection($elections),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Display a listing of the admin resource.
     */
    public function adminIndex()
    {  
        $user = auth()->user();
        $elections = Election::query()
            ->where('admin_id', $user->id)
            ->get();
        return inertia('Admin/Dashboard', [
            'elections' => ElectionResource::collection($elections),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }
}
