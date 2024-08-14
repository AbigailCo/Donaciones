<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;



class CampaignController extends Controller
{
    public function index()
    {
        // Retornar todas las campañas
        $campaigns = Campaign::all();
        return response()->json($campaigns);
    }
    
    public function show($id)
    {
        // Buscar una campaña específica por ID
        $campaign = Campaign::findOrFail($id);
        return response()->json($campaign);
    }

    public function store(Request $request)
    {
        // Validaciones de los datos de entrada
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal' => 'required|numeric|min:1',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Si la validación falla, retornar los errores
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Crear una nueva campaña
        $campaign = Campaign::create([
            'title' => $request->title,
            'description' => $request->description,
            'goal' => $request->goal,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
           'user_id' => Auth::id(),
        ]);

        return response()->json($campaign, 201);
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
}
