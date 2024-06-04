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
        $elections = Election::query()
            ->where('admin_id', $user->id)
            ->get();

        return inertia('User/Dashboard', [
            'elections' => ElectionResource::collection($elections),
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
        ]);
    }
}
