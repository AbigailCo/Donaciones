<?php

use App\Events\CampaignUpdated;
use App\Http\Controllers\Auth\SocialAuthController;
use App\Http\Controllers\CampaignController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Mail\CampaignUpdateNotification;
use App\Mail\TestMail;
use App\Models\Campaign;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




//EMAIL de notificaciones
Route::get('/send-test-mail', function () {
    Mail::to('darvuelvedonaciones@gmail.com')->send(new TestMail());
    return 'Correo de prueba enviado!';
});
Route::post('/campaigns/{id}/update-event', function ($id) {
    $campaign = Campaign::findOrFail($id); // Asegúrate de manejar el caso donde no se encuentre la campaña
    event(new CampaignUpdated($campaign));

    Mail::to('darvuelvedonaciones@gmail.com')->send(new CampaignUpdateNotification($campaign));

    return response()->json(['message' => 'Evento de campaña actualizado y correo enviado.']);
});


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
//Seccion de estadisticass globales
Route::get('/estadisGenerales', [CampaignController::class, 'estadisGenerales']);
Route::get('/UserDona', [CampaignController::class, 'donationCorrelation']);
Route::get('/estadisConvinada', [CampaignController::class, 'getMetrics']);
Route::get('/EstadisticasGlobales', function () {
    return Inertia::render('Campaign/CampaignGeneral'); // Asegúrate de usar el path correcto
})->middleware(['auth', 'verified'])->name('EstadisticasGlobales');

//CONTROLADORES
Route::get('/campaign-count', [CampaignController::class, 'count'])->name('campaign.count');
Route::get('/user-campaigns/count', [CampaignController::class, 'countUserCampaigns'])->middleware('auth');
Route::get('/user-favorites/count', [CampaignController::class, 'countUserFavorites'])->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth:sanctum')->group(function() {
    Route::get('/campaigns', [CampaignController::class, 'index']);
    Route::post('/api/campaigns', [CampaignController::class, 'store'])->name('campaign.store');
    Route::get('/my-campaigns', [CampaignController::class, 'myCampaigns'])->name('myCampaigns');
    // Para mostrar solo las campañas del usuario
Route::get('/my-campaigns/{id}', function($id) {
    return app(CampaignController::class)->show($id, true);
})->name('myCampaigns.show');
//Para mostrar todas las campañas
    Route::get('/campaigns/{id}', [CampaignController::class, 'show'])->name('campaigns.show');
  
    Route::post('/campaigns/{id}/payment-preference', [CampaignController::class, 'createPaymentPreference']);

    /* Route::get('/campaigns/{id}', [CampaignController::class, 'show']); */



    Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
   // Route::get('/campaigns/{id}/edit', [CampaignController::class, 'edit'])->name('campaign.edit');

    Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);
});

//RUTAS DE FAVORITOS

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/favorites/{id}', [FavoriteController::class, 'store']); // Para agregar a favoritos
    Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']); // Para eliminar de favoritos
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favoritos');
    Route::get('/favorites/{id}', [FavoriteController::class, 'show']); // Para verificar si es favorito
});
Route::middleware('auth:sanctum')->get('/favorites', [FavoriteController::class, 'index'])->name('favoritos');

Route::get('/edit-campaign/{id}', function ($id) {
    return Inertia::render('Campaign/EditCampaign', ['id' => $id]);
})->middleware(['auth', 'verified'])->name('editCampaign');

Route::get('/campaigns/{id}/edit', function ($id) {
    $campaign = Campaign::findOrFail($id); // Asegúrate de importar el modelo Campaign
    return response()->json($campaign);
})->middleware(['auth', 'verified'])->name('campaign.edit');


Route::post('/donations', [DonationController::class, 'store']);
Route::get('/campaigns/{id}/donations', [CampaignController::class, 'getDonations']);
/*
Route::middleware('auth')->group(function () {
    Route::post('/comments', [CommentController::class, 'store']);
    Route::get('/campaigns/{campaign_id}/comments', [CommentController::class, 'index']);
}); */

Route::get('/campaigns/{campaign}/comments', [CommentController::class, 'index']);
Route::post('/comments', [CommentController::class, 'store']);
Route::post('/campaigns/{id}/notes', [CampaignController::class, 'addNote']);
Route::get('/campaigns/{campaign_id}/notes', [CampaignController::class, 'getNotes']);


//prueba de ruta
Route::get('/test', function () {
    return response()->json(['message' => '¡Ruta funcionando!']);
});
require __DIR__.'/auth.php';
