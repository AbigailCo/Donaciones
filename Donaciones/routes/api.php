<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\PaymentController;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;





Route::middleware('auth:sanctum')->group(function () {
    Route::post('/campaigns', [CampaignController::class, 'store']);
   
    Route::get('/my-campaigns', [CampaignController::class, 'myCampaigns'])->name('myCampaigns');
});
Route::get('/campaigns/{id}', function ($id) {
    $campaign = Campaign::findOrFail($id);
    return Inertia::render('CampaignDetail', [
        'campaign' => $campaign,
    ]);
});
/*  */
/* Route::post('/donations/create', [DonationController::class, 'create']); */
Route::get('/test', function () {
    return response()->json(['message' => '¡Ruta funcionando!']);
});