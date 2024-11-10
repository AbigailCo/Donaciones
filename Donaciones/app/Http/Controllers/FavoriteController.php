<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index()
    {
        $favorites = auth()->user()->favorites()
            ->with(['campaign.images', 'campaign.category']) // Cargar las relaciones de imágenes y categoría de la campaña
            ->get();
    
        return Inertia::render('Campaign/FavoritesPage', [
            'favorites' => $favorites,
        ]);
    }
    public function store(Request $request, $campaignId)
    {
        $user = $request->user();
        $user->favoritedCampaigns()->attach($campaignId);
        return response()->json(['message' => 'Esta campaña es favorita'], 200);
    }
    public function destroy(Request $request, $campaignId)
    {
        $user = $request->user();
        $user->favoritedCampaigns()->detach($campaignId);
        return response()->json(['message' => 'Campaña eliminada de favoritos'], 200);
    }
    public function show($id)
    {
        // Verifica si la campaña ya es favorita para el usuario autenticado
        $isFavorite = Favorite::where('user_id', Auth::id())
                              ->where('campaign_id', $id)
                              ->exists();

        return response()->json(['isFavorite' => $isFavorite]);
    }
}
