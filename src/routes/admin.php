<?php

use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Admin\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Admin\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Admin\Auth\NewPasswordController;
use App\Http\Controllers\Admin\Auth\PasswordController;
use App\Http\Controllers\Admin\Auth\PasswordResetLinkController;
use App\Http\Controllers\Admin\Auth\RegisteredUserController;
use App\Http\Controllers\Admin\Auth\VerifyEmailController;
use App\Http\Controllers\Admin\CandidateController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Admin\ElectionController;
use App\Http\Controllers\Admin\VoterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function(){
    Route::middleware('guest:admin')->group(function () {
        Route::get('register', [RegisteredUserController::class, 'create'])
                    ->name('register');

        Route::post('register', [RegisteredUserController::class, 'store']);

        Route::get('login', [AuthenticatedSessionController::class, 'create'])
                    ->name('login');

        Route::post('login', [AuthenticatedSessionController::class, 'store']);

        Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                    ->name('password.request');

        Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                    ->name('password.email');

        Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                    ->name('password.reset');

        Route::post('reset-password', [NewPasswordController::class, 'store'])
                    ->name('password.store');
    });

    Route::middleware('auth:admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'adminIndex'])->name('dashboard');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::resource('election', ElectionController::class);
        Route::resource('election.candidates', CandidateController::class)->shallow();
        Route::resource('election.voters', VoterController::class)->shallow();

        Route::get('verify-email', EmailVerificationPromptController::class)->name('verification.notice');
        Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                    ->middleware(['signed', 'throttle:6,1'])
                    ->name('verification.verify');
        Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                    ->middleware('throttle:6,1')
                    ->name('verification.send');
        Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
                    ->name('password.confirm');
        Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);
        Route::put('password', [PasswordController::class, 'update'])->name('password.update');
        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

        // `status` を `Building` から `Scheduling` にするメソッド
        Route::post('launch-election/{election}', [ElectionController::class, 'launchElection'])->name('launch-election');

        Route::post('update-election-status/{election}', [ElectionController::class, 'updateElectionStatus'])->name('update-election-status');

        // 結果を表示するルーティングメソッド
        Route::get('election/{election}/results', [VoteController::class, 'showAdminResult'])->name('election.showAdminResult');

        Route::delete('election-destroy/{election}', [ElectionController::class, 'destroy'])->name('admin.election.destroy');

        
    });
});
