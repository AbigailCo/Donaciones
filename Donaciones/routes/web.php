<?php

use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Campaign;


//Session con google
Route::get('auth/google', [SocialAuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);
//API mercado pago

Route::get('/donations/success', [PaymentController::class, 'success'])->name('donations.success');
Route::get('/donations/failure', [PaymentController::class, 'failure'])->name('donations.failure');
Route::get('/donations/pending', [PaymentController::class, 'pending'])->name('donations.pending');
//WELCOME Y DESHBOARD
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

//PAGES
Route::get('/campaign', function () {
    return Inertia::render('Campaign/Campaign'); // Asegúrate de usar el path correcto
})->middleware(['auth', 'verified'])->name('campaign');
Route::get('/campaigns', [CampaignController::class, 'index']);
Route::get('/CreateCampaign', function () {
    return Inertia::render('Campaign/CreateCampaign'); // Asegúrate de usar el path correcto
})->middleware(['auth', 'verified'])->name('CreateCampaign');
Route::get('/campaigns/search', [CampaignController::class, 'search']);
Route::get('/categories', [CategoryController::class, 'index']);


//CONTROLADORES
Route::get('/campaign-count', [CampaignController::class, 'count'])->name('campaign.count');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/campaigns', [CampaignController::class, 'index']);
    Route::post('/api/campaigns', [CampaignController::class, 'store'])->name('campaign.store');
    Route::get('/my-campaigns', [CampaignController::class, 'myCampaigns'])->name('myCampaigns');
    Route::get('/my-campaigns/{id}', [CampaignController::class, 'showMyCampaignDetails'])->name('myCampaignDetails');

  
    Route::post('/campaigns/{id}/payment-preference', [CampaignController::class, 'createPaymentPreference']);

    Route::get('/campaigns/{id}', [CampaignController::class, 'show']);


    Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
   // Route::get('/campaigns/{id}/edit', [CampaignController::class, 'edit'])->name('campaign.edit');

    Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);
});

Route::get('/edit-campaign/{id}', function ($id) {
    return Inertia::render('Campaign/EditCampaign', ['id' => $id]);
})->middleware(['auth', 'verified'])->name('editCampaign');

Route::get('/campaigns/{id}/edit', function ($id) {
    $campaign = Campaign::findOrFail($id); // Asegúrate de importar el modelo Campaign
    return response()->json($campaign);
})->middleware(['auth', 'verified'])->name('campaign.edit');


Route::post('/donations', [DonationController::class, 'store']);
Route::get('/campaigns/{id}/donations', [CampaignController::class, 'getDonations']);

//prueba de ruta
Route::get('/test', function () {
    return response()->json(['message' => '¡Ruta funcionando!']);
});
require __DIR__.'/auth.php';
