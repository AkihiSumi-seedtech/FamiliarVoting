<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CandidateController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Corrected API route definition
Route::middleware('auth:sanctum')->get('/admin/fetch-candidates', [CandidateController::class, 'fetchCandidates'])->name('admin.fetch.candidates');

Route::get('/candidate-election/{election_id}', function ($election_id) {
    return DB::table('candidate_election')->where('election_id', $election_id)->count();
});

Route::get('/election-user/{election_id}', function ($election_id) {
    return DB::table('election_user')->where('election_id', $election_id)->count();
});