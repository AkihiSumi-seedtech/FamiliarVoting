<?php

use App\Http\Controllers\Admin\ElectionController;
use App\Http\Controllers\ProfileController;
use App\Models\Election;
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
})->middleware(['auth', 'verified'])->name('thanks');


Route::get('/dashboard', function () {
    return Inertia::render('User/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';

Route::prefix('admin')->name('admin.')->group(function(){
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->middleware(['auth:admin', 'verified'])->name('dashboard');

    Route::resource('election', ElectionController::class)->middleware(['auth:admin', 'verified']);

    // Route::get('/election/overview', function (Election $election) {
    //     return Inertia::render('Admin/election/Overview', ['election' => $election]);
    // })->middleware(['auth:admin', 'verified'])->name('overview');

    require __DIR__.'/admin.php';
});