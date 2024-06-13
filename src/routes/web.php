<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\ElectionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::resource('election', ElectionController::class)->middleware(['auth:admin']);
// Route::resource('elections', ElectionController::class);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'voterIndex'])
    ->middleware(['auth', 'verified'])->name('voterDashboard');

Route::resource('election.vote', VoteController::class);
Route::get('/{election}/result', [VoteController::class, 'showVoterResult'])->name('showVoterResult');
Route::get('/{election}/detail',[VoteController::class, 'showDetail'])->name('showDetail');

require __DIR__.'/auth.php';

require __DIR__.'/admin.php';