<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CampaignController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/campaign', function () {
    return Inertia::render('Campaign/Campaign'); // Asegúrate de usar el path correcto
})->middleware(['auth', 'verified'])->name('campaign');

Route::get('/CreateCampaign', function () {
    return Inertia::render('Campaign/CreateCampaign'); // Asegúrate de usar el path correcto
})->middleware(['auth', 'verified'])->name('CreateCampaign');
Route::get('/campaign-count', [CampaignController::class, 'count'])->name('campaign.count');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/campaigns', [CampaignController::class, 'index']);
    Route::post('/campaigns', [CampaignController::class, 'store'])->name('campaign.store');
    Route::get('/campaigns/{id}', [CampaignController::class, 'show']);
    Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
    Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);
});
require __DIR__.'/auth.php';
