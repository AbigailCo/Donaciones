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
        // Retornar todas las campañas
        $campaigns = Campaign::all();
        return response()->json($campaigns);
    }
    public function count()
    {
        $campaigntsCount = Campaign::count();
        return response()->json(['count' => $campaigntsCount]);
    }
    public function show($id)
{
    // Buscar una campaña específica por ID
    $campaign = Campaign::findOrFail($id);

    // Devolver una vista Inertia
    return Inertia::render('Campaign/CampaignDetails', [
        'campaign' => $campaign
    ]);
}

    public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'goal' => 'required|numeric|min:1',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('images', 'public');
        $imageName = basename($imagePath);
        $validated['image'] = $imageName;
    }

    $validated['user_id'] = Auth::id(); // Asegura que el creador es el usuario autenticado

    try {
        $campaign = Campaign::create($validated);
        return response()->json([
            'message' => 'Campaign created successfully!',
            'campaign' => $campaign,
        ], 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Error creating campaign',
            'error' => $e->getMessage(),
        ], 500);
        return redirect()->route('myCampaigns');
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
    // Obtener todas las campañas del usuario autenticado
    $campaigns = Campaign::where('user_id', auth()->id())->get();

    // Retornar la vista de MyCampaigns con los datos
    return Inertia::render('MyCampaigns', [
        'campaigns' => $campaigns,
    ]);
}

}
