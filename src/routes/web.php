<?php

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

Route::get('/vote', function () {
    return Inertia::render('User/Vote');
})->middleware(['auth', 'verified'])->name('vote');

Route::get('/thanks', function () {
    return Inertia::render('User/Thanks');
})->middleware(['auth', 'verified'])->name('vote');


Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('vote', VoteController::class);

require __DIR__.'/auth.php';

require __DIR__.'/admin.php';