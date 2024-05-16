<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CandidateController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Corrected API route definition
Route::middleware('auth:sanctum')->get('/admin/fetch-candidates', [CandidateController::class, 'fetchCandidates'])->name('admin.fetch.candidates');

