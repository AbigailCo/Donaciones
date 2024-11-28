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
use App\Http\Controllers\AdminController;
use App\Mail\TestMail;
use App\Models\Campaign;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Middleware\IsAdmin;


////////////////////////////////////////////////////////////////////////
//                       NOTIFICACIONES POR MAIL                     //
////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////
//                       INICIAR SESSION CON GOOGLE                   //
////////////////////////////////////////////////////////////////////////

Route::get('auth/google', [SocialAuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);

////////////////////////////////////////////////////////////////////////
//                       BREEZE INICIO DE SESSION                    //
////////////////////////////////////////////////////////////////////////
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//Agregamos una foto de perfil
Route::post('/user/profile', [ProfileController::class, 'updatePhoto']);
Route::get('/userCreador/{id}', [CampaignController::class, 'getCreator']);

////////////////////////////////////////////////////////////////////////
//                       INTEGRACION DE MERCADO PAGO                  //
////////////////////////////////////////////////////////////////////////

Route::get('/donations/success', [PaymentController::class, 'success'])->name('donations.success');
Route::get('/donations/failure', [PaymentController::class, 'failure'])->name('donations.failure');
Route::get('/donations/pending', [PaymentController::class, 'pending'])->name('donations.pending');

////////////////////////////////////////////////////////////////////////
//                       RUTAS DE PAGINAS INTERNA                     //
////////////////////////////////////////////////////////////////////////

//WELCOME
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//DASHBOAR o panel de usuario
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//CAMPAIGNS todas las campañas
Route::get('/campaign', function () {
    return Inertia::render('Campaign/Campaign'); // Asegúrate de usar el path correcto
})->middleware(['auth', 'verified'])->name('campaign');

//CREATE CAMPAIGN 
Route::get('/CreateCampaign', function () {
    return Inertia::render('Campaign/CreateCampaign'); // Asegúrate de usar el path correcto
})->middleware(['auth', 'verified'])->name('CreateCampaign');


////////////////////////////////////////////////////////////////////////
//                       ESTADISTICAS GLOBALES                        //
////////////////////////////////////////////////////////////////////////

Route::get('/estadisGenerales', [CampaignController::class, 'estadisGenerales']);
Route::get('/UserDona', [CampaignController::class, 'donationCorrelation']);
Route::get('/estadisConvinada', [CampaignController::class, 'getMetrics']);
Route::get('/allCampaigns', [CampaignController::class, 'exportAllCampaigns']);
Route::get('/EstadisticasGlobales', function () {
    return Inertia::render('Campaign/CampaignGeneral'); 
})->middleware(['auth', 'verified'])->name('EstadisticasGlobales');

////////////////////////////////////////////////////////////////////////
//                       CONTROLADORES                                //
////////////////////////////////////////////////////////////////////////

//COUNT para las card del panel
Route::get('/campaign-count', [CampaignController::class, 'count'])->name('campaign.count');
Route::get('/user-campaigns/count', [CampaignController::class, 'countUserCampaigns'])->middleware('auth');
Route::get('/user-favorites/count', [CampaignController::class, 'countUserFavorites'])->middleware('auth');
//BUSCADOR
Route::get('/campaigns/search', [CampaignController::class, 'search']);
//CATEGORIAS
Route::get('/categories', [CategoryController::class, 'index']);

////////////////////////////////////////////////////////////////////////
//                       CONTROLADORES de campañas                    //
////////////////////////////////////////////////////////////////////////
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/campaigns', [CampaignController::class, 'index']);
    Route::post('/api/campaigns', [CampaignController::class, 'store'])->name('campaign.store');
    Route::get('/my-campaigns', [CampaignController::class, 'myCampaigns'])->name('myCampaigns');
    // Para mostrar solo las campañas del usuario
    Route::get('/my-campaigns/{id}', function ($id) {
        return app(CampaignController::class)->show($id, true);
    })->name('myCampaigns.show');
    //Para mostrar todas las campañas
    Route::get('/campaigns/{id}', [CampaignController::class, 'show'])->name('campaigns.show');
    Route::post('/campaigns/{id}/payment-preference', [CampaignController::class, 'createPaymentPreference']);
    Route::delete('/campaigns/{id}', [CampaignController::class, 'destroy']);
    Route::put('/campaigns/{id}', [CampaignController::class, 'update']);
    Route::get('/campaigns/{id}/edit', [CampaignController::class, 'edit']);
   
});
Route::get('/campaigns', [CampaignController::class, 'index']);
////////////////////////////////////////////////////////////////////////
//                       editar campaña                              //
////////////////////////////////////////////////////////////////////////
Route::get('/campaigns/{id}/images', [CampaignController::class, 'getImages']);
Route::post('/campaigns/{id}/images', [CampaignController::class, 'updateImages']);
Route::delete('/images_campaign/{id}', [CampaignController::class, 'deleteImage']);
Route::put('/update_youtube/{id}', [CampaignController::class, 'updateLink']);
////////////////////////////////////////////////////////////////////////
//                       CONTROLADORES de favoritos                   //
////////////////////////////////////////////////////////////////////////

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/favorites/{id}', [FavoriteController::class, 'store']); // Para agregar a favoritos
    Route::delete('/favorites/{id}', [FavoriteController::class, 'destroy']); // Para eliminar de favoritos
    Route::get('/favorites', [FavoriteController::class, 'index'])->name('favoritos');
    Route::get('/favorites/{id}', [FavoriteController::class, 'show']); // Para verificar si es favorito
});
Route::middleware('auth:sanctum')->get('/favorites', [FavoriteController::class, 'index'])->name('favoritos');
////////////////////////////////////////////////////////////////////////
//                       CONTROLADORES de donaciones                 //
////////////////////////////////////////////////////////////////////////
Route::post('/donations', [DonationController::class, 'store']);
Route::get('/campaigns/{id}/donations', [CampaignController::class, 'getDonations']);

////////////////////////////////////////////////////////////////////////
//                       CONTROLADORES de comentarios y notas         //
////////////////////////////////////////////////////////////////////////

Route::get('/campaigns/{campaign}/comments', [CommentController::class, 'index']);
Route::post('/comments', [CommentController::class, 'store']);
Route::post('/campaigns/{id}/notes', [CampaignController::class, 'addNote']);
Route::get('/campaigns/{campaign_id}/notes', [CampaignController::class, 'getNotes']);

////////////////////////////////////////////////////////////////////////
//                       CONTROLADORES panel de usuario               //
////////////////////////////////////////////////////////////////////////


Route::middleware(['auth', 'verified', IsAdmin::class])->group(function () {
    // Ruta para el panel principal de administración
    Route::get('/admin', function () {
        return Inertia::render('Admin/AdminDashboard');
    })->name('admin.dashboard');

    // Rutas para campañas en el panel de administración
    Route::get('/admin/campaigns', [CampaignController::class, 'getCampaigns']);
   // Route::delete('/admin/campaigns/{id}', [CampaignController::class, 'destroy']);

    // Rutas para usuarios en el panel de administración
    Route::get('/admin/users', [AdminController::class, 'getUsers']);
    //Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);
    Route::put('/admin/users/{id}/assign-admin', [AdminController::class, 'assignAdmin']);
    Route::put('/admin/users/{id}/remove-admin', [AdminController::class, 'removeAdmin']);
    // Para habilitar o deshabilitar campañas
    Route::put('/admin/campaigns/{id}/status/{status}', [CampaignController::class, 'updateStatus']);

    // Para habilitar o deshabilitar usuarios
    Route::put('/admin/users/{id}/status/{status}', [AdminController::class, 'updateStatus']);

  




});

////////////////////////////////////////////////////////////////////////
//                            PRUEBA                                  //
////////////////////////////////////////////////////////////////////////
Route::get('/test', function () {
    return response()->json(['message' => '¡Ruta funcionando!']);
});
require __DIR__ . '/auth.php';
