<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\CampaignUpdateNotification;
use App\Models\Campaign;
use App\Models\CampaignImage;
use App\Models\Category;
use App\Models\Donation;
use App\Models\Note;
use App\Models\NoteImage;
use App\Models\User;
use App\Notifications\CampaignUpdated;
use App\Notifications\DonationReceived;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
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


    public function countUserCampaigns()
    {
        $userId = auth()->id(); // Obtiene el ID del usuario logueado
        $userCampaignsCount = Campaign::where('user_id', $userId)->count(); // Cuenta las campañas del usuario

        return response()->json(['count' => $userCampaignsCount]); // Retorna la cuenta en formato JSON
    }

    public function countUserFavorites()
    {
        $userId = auth()->id();

        $userFavoritesCount = User::find($userId)
            ->favoritedCampaigns()
            ->count();

        return response()->json(['count' => $userFavoritesCount]);
    }

    public function show($id, $onlyUserCampaign = false)
    {
        // Obtener la campaña, aplicando el filtro de usuario si es necesario
        $query = Campaign::with('images', 'category')->where('id', $id);

        if ($onlyUserCampaign) {
            $userId = auth()->id();
            $query->where('user_id', $userId);
        }

        $campaign = $query->first();

        if (!$campaign) {
            return redirect()->route('campaigns')->with('error', 'Campaña no encontrada o no tienes permiso para verla.');
        }

        $categoryName = $campaign->category->name ?? 'Sin categoría';

        return Inertia::render('Campaign/CampaignDetails', [
            'campaign' => $campaign,
            'categoryName' => $categoryName,
            'youtube_link' => $campaign->youtube_link
        ]);
    }


    public function store(Request $request)
    {
        Log::info($request->all());
        // Validación para la campaña
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal' => 'required|numeric|min:1',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'youtube_link' => 'nullable|url',
            'category_id' => 'required|exists:categories,id',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'alias' => 'nullable|string|regex:/^\S+$/',
            'cvu' => 'nullable|string|max:22',
            'cbu' => 'nullable|string|max:22',
        ]);
        if (collect(['alias', 'cvu', 'cbu'])->filter(fn($key) => $request->filled($key))->count() > 1) {
            return response()->json([
                'message' => 'Solo uno de los campos alias, cvu o cbu puede estar presente.',
            ], 422);
        }

        // Asignar el ID del usuario a la campaña
        $validated['user_id'] = Auth::id();

        try {
            // Crear la campaña con las coordenadas
            $campaign = Campaign::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'goal' => $validated['goal'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'youtube_link' => $validated['youtube_link'] ?? null, // Si hay un enlace de YouTube
                'category_id' => $validated['category_id'],
                'latitude' => $validated['latitude'],
                'longitude' => $validated['longitude'],
                'user_id' => $validated['user_id'],
                'alias' => $validated['alias'] ?? null,
                'cvu' => $validated['cvu'] ?? null,
                'cbu' => $validated['cbu'] ?? null,
            ]);

            // Si se suben imágenes, guardarlas
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $imagePath = $image->store('images', 'public');
                    $imageName = basename($imagePath); // Obtener solo el nombre del archivo

                    $campaign->images()->create([
                        'path' => $imageName, // Guardar el nombre de la imagen
                    ]);
                }
            } else {
                // Asignar imagen por defecto si no hay imágenes subidas
                $campaign->images()->create([
                    'path' => 'defecto.jpg', // Nombre de la imagen por defecto
                ]);
            }

            // Validación para la donación
            $donationValidated = $request->validate([
                'amount' => 'required|numeric|min:1', // Validar el monto de la donación
            ]);

            // Crear la donación
            $donation = Donation::create([
                'amount' => $donationValidated['amount'],
                'user_id' => Auth::id(), // El ID del usuario que realiza la donación
                'campaign_id' => $campaign->id,
            ]);

            // Obtener el creador de la campaña
            $creator = $campaign->user; // El usuario que creó la campaña

            // Enviar notificación de la donación al creador de la campaña
            $creator->notify(new DonationReceived($donationValidated['amount'], $campaign->title));

            return redirect()->route('myCampaigns')->with('success', '¡Campaña creada exitosamente y donación registrada!');
        } catch (\Exception $e) {
            Log::error('Error creando la campaña o registrando la donación: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Error al crear la campaña o registrar la donación');
        }
    }

    public function update(Request $request, $id)
    {
        $campaign = Campaign::findOrFail($id);

        // Validación
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'goal' => 'required|numeric',
            'end_date' => 'required|date',
        ]);

        // Actualizar campaña
        $campaign->update([
            'title' => $request->title,
            'description' => $request->description,
            'goal' => $request->goal,
            'end_date' => $request->end_date,
        ]);

        return Inertia::render('Campaign/CampaignDetails');
    }

    public function edit($id)
    {
        $campaign = Campaign::find($id);
        if (!$campaign) {
            return response()->json(['message' => 'Campaña no encontrada'], 404);
        }
        return Inertia::render('Campaign/EditCampaign', [
            'campaign' => $campaign
        ]);
    }

    //EDICION DE IMAGENES DE LA CAMPAÑA
    public function getImages($id)
    {
        $campaign = Campaign::findOrFail($id);
        $images = $campaign->images;
        return response()->json($images);
    }

    public function updateImages(Request $request, $id)
    {
        $request->validate([
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $campaign = Campaign::findOrFail($id);

        if ($request->hasFile('images')) {
            $uploadedImages = [];

            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('images', 'public');
                $imageName = basename($imagePath);
                // Crear registro en la tabla images_campaign
                $imageRecord = $campaign->images()->create(['path' =>  $imageName]);

                $uploadedImages[] = $imageRecord;
            }

            return response()->json([
                'message' => 'Imágenes actualizadas exitosamente',
                'images' => $uploadedImages,
            ]);
        }

        return response()->json(['message' => 'No se subieron imágenes'], 400);
    }

    public function deleteImage($id)
    {
        $image = CampaignImage::findOrFail($id);

        // Eliminar archivo físico
        Storage::disk('public')->delete($image->path);

        // Eliminar registro de la base de datos
        $image->delete();

        return response()->json(['message' => 'Imagen eliminada correctamente']);
    }

    public function updateLink(Request $request, $id)
{
    $validated = $request->validate([
        'youtube_link' => 'nullable|string|max:255|url', // Validación del enlace
    ]);

    $campaign = Campaign::findOrFail($id);
    $campaign->update($validated);

    return response()->json(['message' => 'Campaña actualizada exitosamente.', 'campaign' => $campaign]);
}
    public function destroy($id)
    {
        $campaign = Campaign::findOrFail($id);
        $this->authorize('delete', $campaign);

        // Eliminar la campaña
        $campaign->delete();

        return response()->json(['message' => 'Campaign deleted successfully']);
    }

    public function myCampaigns()
    {
        $userId = auth()->id();
        $campaigns = Campaign::where('user_id', $userId)
            ->with(['images', 'category']) // Asegura cargar la relación de categoría
            ->get();

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

    public function getDonations($id)
    {
        $donations = Donation::where('campaign_id', $id)->get();
        return response()->json($donations);
    }
    public function search(Request $request)
    {
        $query = Campaign::with(['images', 'category']);

        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('term')) {
            $query->where('title', 'like', '' . $request->term . '%');
        }

        if ($request->filled('categories')) {
            $categories = is_array($request->categories) ? $request->categories : json_decode($request->categories, true);

            if (!empty($categories) && is_array($categories)) {
                $query->whereIn('category_id', $categories);
            }
        }

        try {
            $campaigns = $query->get();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error fetching campaigns: ' . $e->getMessage()], 500);
        }

        return response()->json($campaigns);
    }


    public function addNote(Request $request, $id)
    {
        Log::info("Endpoint alcanzado para la campaña: {$id}");
        $validated = $request->validate([
            'note' => 'required|string|max:5000',
            'images' => 'nullable|array',
            'images.*' => 'image|max:2048',
        ]);
        Log::info("Nota validada correctamente.");

        $campaign = Campaign::findOrFail($id);

        // Verifico que el usuario es el creador de la campaña
        if (auth()->id() !== $campaign->user_id) {
            abort(403, 'No tienes permiso para agregar notas a esta campaña.');
        }

        // Creo la nota
        $note = $campaign->notes()->create([
            'note' => $validated['note'],
        ]);


        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $imagePath = $image->store('images', 'public');
                $imageName = basename($imagePath); // Obtener solo el nombre del archivo
                // Crear el registro en la tabla note_images
                NoteImage::create([
                    'note_id' => $note->id,
                    'path' => $imageName,
                ]);
            }
        }

        // Obtengo todos los donantes de la campaña
        $donors = Donation::where('campaign_id', $campaign->id)
            ->distinct()
            ->pluck('user_id'); // Obtengo los IDs únicos de los donantes

        foreach ($donors as $donorId) {
            $donor = User::find($donorId);

            if ($donor) {
                // Envio notificación al donante (correo y base de datos)
                $donor->notify(new CampaignUpdated($note, $campaign->title));
            }
        }

        return response()->json(['message' => 'Nota agregada y notificaciones enviadas'], 200);
    }

    public function getNotes($campaign_id)
    {
        $notes = Note::with('images')
            ->where('campaign_id', $campaign_id)
            ->get()
            ->map(function ($note) {
                // Formatear la fecha de creación
                $note->created_at_formatted = $note->created_at->format('d/m/Y H:i'); // o cualquier formato que prefieras
                return $note;
            });

        return response()->json($notes);
    }


    //PARTE DE ESTADISTICAS
    public function estadisGenerales()
    {
        // Ejemplo de obtener algunas estadísticas, como el total de campañas y su progreso
        $totalCampaigns = Campaign::count();
        $activeCampaigns = Campaign::where('end_date', '>', now())->count();
        $inactiveCampaign = Campaign::where('end_date', '<', now())->count();

        $completedCampaigns = Campaign::where('goal', '<=', DB::raw('total_donated'))
            ->count();
        $incompletedCampaign = Campaign::where('goal', '>', DB::raw('total_donated'))
            ->count();

        // Retornar los datos como un array
        return response()->json([
            'totalCampaigns' => $totalCampaigns,
            'activeCampaigns' => $activeCampaigns,
            'inactiveCampaign' => $inactiveCampaign,
            'completedCampaigns' => $completedCampaigns,
            'incompletedCampaign'  => $incompletedCampaign,
        ]);
    }
    public function donationCorrelation()
    {
        // Agrupar donaciones por usuario
        $donations = Donation::selectRaw('users.name, donations.user_id, COUNT(*) as total_donations, SUM(donations.amount) as total_amount')
            ->join('users', 'users.id', '=', 'donations.user_id') // Hacemos la unión con la tabla users
            ->groupBy('donations.user_id', 'users.name') // Agrupamos por user_id y name
            ->get();

        // Transformar los datos en un formato adecuado para el frontend
        $correlationData = $donations->map(function ($donation) {
            return [
                'user_id' => $donation->user_id,
                'user_name' => $donation->name,
                'total_donations' => $donation->total_donations,
                'total_amount' => $donation->total_amount,
            ];
        });

        // Retornar los datos como JSON al frontend
        return response()->json([
            'data' => $correlationData
        ]);
    }
    public function getMetrics()
    {
        // Obtener las métricas de las campañas: alcance, donaciones, participación
        $campaigns = Campaign::all()->map(function ($campaign) {
            return [
                'name' => $campaign->title,
                'alcance' => $campaign->donations->pluck('user_id')->unique()->count(),
                'donaciones' => $campaign->donations->sum('amount'),

            ];
        });

        // Obtener las donaciones a lo largo del tiempo
        $donationsOverTime = Donation::selectRaw('DATE(created_at) as date, SUM(amount) as total_donations')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Obtener las estadísticas por usuario (campañas activas y total de donaciones)
        $userStats = User::withCount('campaigns')
            ->withSum('donations', 'amount')
            ->get()
            ->map(function ($user) {
                return [
                    'user_name' => $user->name,
                    'user_id' => $user->id,
                    'total_campaigns' => $user->campaigns_count,
                    'total_donations' => $user->donations_sum_amount,
                ];
            });

        // Retornar los datos al frontend en formato JSON
        return response()->json([
            'campaignData' => $campaigns,
            'donationsOverTime' => $donationsOverTime,
            'campaignStats' => $userStats,
        ]);
    }

    public function exportAllCampaigns()
    {
        // Obtener todas las campañas con el nombre de la categoría
        $campaigns = Campaign::with('category:id,name')
            ->get()
            ->map(function ($campaign) {
                return [
                    'id' => $campaign->id,
                    'title' => $campaign->title,
                    'description' => $campaign->description,
                    'goal' => $campaign->goal,
                    'total_donated' => $campaign->total_donated,
                    'start_date' => $campaign->start_date,
                    'end_date' => $campaign->end_date,
                    'user_id' => $campaign->user_id,
                    'youtube_link' => $campaign->youtube_link,
                    'created_at' => $campaign->created_at,
                    'updated_at' => $campaign->updated_at,
                    'deleted_at' => $campaign->deleted_at,
                    'category_name' => $campaign->category->name ?? null, // Nombre de la categoría o null
                    'latitude' => $campaign->latitude,
                    'longitude' => $campaign->longitude,
                    'address' => $campaign->address,
                ];
            });

        // Retornar los datos en formato JSON
        return response()->json([
            'campaigns' => $campaigns
        ]);
    }
}
