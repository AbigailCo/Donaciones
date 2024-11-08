<?php

use App\Http\Controllers\CampaignController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\MercadoPagoController;
use App\Models\Campaign;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;





Route::middleware('auth:sanctum')->group(function () {
    Route::post('/campaigns', [CampaignController::class, 'store']);
    Route::get('/categories', [CategoryController::class, 'index']);
    
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
Route::middleware('auth:sanctum')->get('/api/notifications', function () {
    return response()->json(auth()->user()->notifications);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/campaigns', [CampaignController::class, 'store']);
    Route::get('/categories', [CategoryController::class, 'index']);
    
    // Mantén solo esta línea para las notificaciones
  //  Route::get('/notifications', [NotificationController::class, 'getNotifications']); 
});

Route::post('/create-payment', [MercadoPagoController::class, 'createPayment']);
Route::get('/campaigns/search', [CampaignController::class, 'search']);


