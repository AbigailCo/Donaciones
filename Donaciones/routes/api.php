<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CampaignController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/campaigns', [CampaignController::class, 'store']);
});
