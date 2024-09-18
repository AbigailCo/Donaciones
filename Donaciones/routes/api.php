<?php

use App\Http\Controllers\CampaignController;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/campaigns', [CampaignController::class, 'store']);
});
Route::get('/campaigns/{id}', function ($id) {
    $campaign = Campaign::findOrFail($id);
    return Inertia::render('CampaignDetail', [
        'campaign' => $campaign,
    ]);
});
