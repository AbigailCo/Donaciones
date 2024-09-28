<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;



class CampaignController extends Controller
{
    public function index()
    {
        // Retornar todas las campañas con sus imágenes asociadas
        $campaigns = Campaign::with('images')->get(); // Asegúrate de que 'campaignImages' sea la relación correcta
        return response()->json($campaigns);
    }
    public function count()
    {
        $campaignsCount = Campaign::count(); // Corregido
        return response()->json(['count' => $campaignsCount]);
    }
    public function show($id)
    {
        // Buscar una campaña específica por ID
        $campaign = Campaign::with('images')->findOrFail($id); // Traer también las imágenes

        // Devolver una vista Inertia
        return Inertia::render('Campaign/CampaignDetails', [
            'campaign' => $campaign,
            'youtube_link' => $campaign->youtube_link // Enviar el enlace de YouTube
        ]);
    }

    public function store(Request $request)
    {
        // Validación
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal' => 'required|numeric|min:1',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validar múltiples imágenes
            'youtube_link' => 'nullable|url', // Validar el enlace de YouTube
        ]);

        $validated['user_id'] = Auth::id(); // Asegura que el creador es el usuario autenticado

        try {
            // Crear la campaña
            $campaign = Campaign::create($validated);

            // Si se suben imágenes, guardarlas
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('images', 'public'); // Asegúrate que la carpeta existe
                    $imageName = basename($imagePath);

                    // Crear registros de CampaignImage
                    $campaign->images()->create([
                        'path' => $imageName,
                    ]);
                }
            }

            // Redirigir a la página de "MyCampaigns" usando Inertia
            return redirect()->route('myCampaigns')->with('success', 'Campaña creada exitosamente!');
        } catch (\Exception $e) {
            Log::error('Error creando la campaña: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al crear la campaña');
        }
    }

    public function update(Request $request, $id)
    {
        // Buscar la campaña por ID
        $campaign = Campaign::findOrFail($id);

        // Autorizar la actualización de la campaña
        $this->authorize('update', $campaign);

        // Validaciones de los datos de entrada
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'goal' => 'sometimes|numeric|min:1',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
        ]);

        // Si la validación falla, retornar los errores
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Actualizar la campaña con los datos validados
        $campaign->update($request->all());

        return response()->json($campaign);
    }

    public function destroy($id)
    {
        // Buscar la campaña por ID
        $campaign = Campaign::findOrFail($id);

        // Autorizar la eliminación de la campaña
        $this->authorize('delete', $campaign);

        // Eliminar la campaña
        $campaign->delete();

        return response()->json(['message' => 'Campaign deleted successfully']);
    }

    public function myCampaigns()
    {
        $userId = auth()->id();
        $campaigns = Campaign::where('user_id', $userId)->get();

        // Envía las campañas a la vista usando Inertia
        return Inertia::render('Campaign/MyCampaigns', [
            'campaigns' => $campaigns
        ]);
    }
}
