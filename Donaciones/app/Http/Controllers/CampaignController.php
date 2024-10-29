<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Campaign;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use GuzzleHttp\Client;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;

class CampaignController extends Controller
{
    public function index(Request $request)
    {
        $query = Campaign::with(['images', 'category']);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Ordeno las campañas por la fecha de creación, de más recientes a más antiguas
        $campaigns = $query->orderBy('created_at', 'desc')->paginate(9);

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
        $campaign = Campaign::with('images', 'category')->findOrFail($id); // Traer también las imágenes
        $categoryName = $campaign->category->name ?? 'Sin categoría';
        // Devolver una vista Inertia
        return Inertia::render('Campaign/CampaignDetails', [
            'campaign' => $campaign,
            'categoryName' => $categoryName,
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
            'category_id' => 'required|exists:categories,id',
        ]);

        $validated['user_id'] = Auth::id();

        try {
            // Crear la campaña
            $campaign = Campaign::create($validated);

            // Si se suben imágenes, guardarlas
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    // Almacenar la imagen en el disco público
                    $imagePath = $image->store('images', 'public');
                    $imageName = basename($imagePath); // Obtener solo el nombre del archivo

                    // Crear registros de CampaignImage
                    $campaign->images()->create([
                        'path' => $imageName, // Guardar el nombre de la imagen
                    ]);
                }
            }

            // Redirigir a la página de "MyCampaigns" usando Inertia
            return redirect()->route('myCampaigns')->with('success', 'Campaña creada exitosamente!');
        } catch (\Exception $e) {
            // Registrar el error en los logs
            Log::error('Error creando la campaña: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al crear la campaña');
        }
    }

    /*
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
    }*/
    public function update(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);

        $this->authorize('update', $campaign);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string',
            'goal' => 'sometimes|numeric|min:1',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
            'youtube_link' => 'nullable|url', // Validación de URL para YouTube
            'images.*' => 'sometimes|image|mimes:jpeg,png,jpg|max:2048' // Validación de imágenes
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $campaign->update($request->except(['images']));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {

                $path = $image->store('public/campaigns'); // Ajusta la ruta de almacenamiento
                $campaign->images()->create(['path' => $path]);
            }
        }

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



    public function createPaymentPreference(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);

        $amount = $request->input('amount'); // Recibir el monto que el usuario quiere donar

        $preferenceData = [
            'items' => [
                [
                    'title' => $campaign->title,
                    'quantity' => 1,
                    'unit_price' => (float)$amount,  // Usar el monto que el usuario ingresa
                ]
            ],
            'back_urls' => [
                'success' => 'http://localhost:8000/campaign',
                'failure' => 'http://localhost:8000/',
                'pending' => 'http://tu_dominio/pending',
            ],
            'auto_return' => 'approved',
            'currency_id' => 'ARS',
        ];

        try {
            $client = new Client();
            $response = $client->post('https://api.mercadopago.com/checkout/preferences', [
                'headers' => [
                    'Authorization' => 'Bearer ' . env('MERCADO_PAGO_ACCESS_TOKEN'),
                    'Content-Type' => 'application/json',
                ],
                'json' => $preferenceData,
            ]);

            $preference = json_decode($response->getBody());

            return response()->json([
                'preference_id' => $preference->id,
                'init_point' => $preference->init_point,  // Devolver la URL para abrir el popup
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    public function showMyCampaignDetails($id)
    {
        $userId = auth()->id();
        $campaign = Campaign::where('id', $id)->where('user_id', $userId)->first();

        if (!$campaign) {
            return redirect()->route('myCampaigns')->with('error', 'Campaña no encontrada o no tienes permiso para verla.');
        }

        return Inertia::render('Campaign/MyCampaignDetails', [
            'campaign' => $campaign
        ]);
    }

    public function getDonations($id)
    {
        $donations = Donation::where('campaign_id', $id)->get();
        return response()->json($donations);
    }
    public function search(Request $request)
    {
        // Prepara la consulta incluyendo las relaciones de imágenes y categoría
        $query = Campaign::with(['images', 'category']);

        // Filtra por categoría si 'category_id' está presente
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filtra por término de búsqueda si 'term' está presente
        if ($request->filled('term')) {
            $query->where('title', 'like', '' . $request->term . '%');
        }

        // Filtra por múltiples categorías si 'categories' está presente
        if ($request->filled('categories')) {
            $categories = is_array($request->categories) ? $request->categories : json_decode($request->categories, true);

            if (!empty($categories) && is_array($categories)) {
                $query->whereIn('category_id', $categories);
            }
        }

        // Ejecuta la consulta y captura posibles errores
        try {
            $campaigns = $query->get();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching campaigns: ' . $e->getMessage()], 500);
        }

        return response()->json($campaigns);
    }
}
