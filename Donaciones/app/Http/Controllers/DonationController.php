<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donation;
use App\Models\User;
use App\Models\Campaign;
use App\Notifications\DonationReceived; 
use Illuminate\Support\Facades\Mail; 
use App\Mail\CampaignUpdateNotification; 
use Illuminate\Support\Facades\Log; 

class DonationController extends Controller
{
    public function store(Request $request)
{
    // Validar los datos de entrada
    $request->validate([
        'campaign_id' => 'required|exists:campaigns,id',
        'amount' => 'required|numeric|min:1',
    ]);

    // Guardar la donación en la base de datos
    $donation = Donation::create([
        'campaign_id' => $request->input('campaign_id'),
        'user_id' => auth()->id(),
        'amount' => $request->input('amount'),
        'payment_status' => 'paid',
        'email_notification_sent' => false, // Inicialmente se establece en false
    ]);

    // Obtener la campaña relacionada
    $campaign = Campaign::find($request->input('campaign_id'));
    $campaign->total_donated += $donation->amount;
    $campaign->save();

    // Obtener todos los donantes de la campaña
    $donors = Donation::where('campaign_id', $campaign->id)
        ->distinct()
        ->pluck('user_id');

    // Enviar notificación a todos los donantes
    foreach ($donors as $donorId) {
        $donor = User::find($donorId);
    
        // Verifica si el donante no ha recibido una notificación para esta campaña
        $hasReceivedNotification = $donor->donations()
            ->where('campaign_id', $campaign->id)
            ->where('email_notification_sent', true) // Cambiar aquí
            ->exists();
    
        if ($donor && !$hasReceivedNotification) {
            // Crear el mensaje de la notificación
            $notificationMessage = [
                'message' => "¡Hey! La campaña '{$campaign->title}' recibió una nueva donación de {$donation->amount}! ¡Gracias por tu apoyo!",
                'donation_amount' => $donation->amount,
                'campaign_title' => $campaign->title,
            ];
    
            // Enviar la notificación de donación recibida
            $donor->notify(new DonationReceived($donation->amount, $campaign->title));
    
            // Enviar el correo al donante
            try {
                Mail::to($donor->email)->send(new CampaignUpdateNotification($campaign));
                
                // Marca la donación como notificada
                // Aquí también podrías agregar una nueva donación para este correo si deseas un mejor control
                $donation->email_notification_sent = true; // Se marca para la donación actual
                $donation->save(); // Guarda el estado de la donación
            } catch (\Exception $e) {
                Log::error('Error al enviar correo: ' . $e->getMessage());
            }
        }
    }

    // Devolver una respuesta exitosa
    return response()->json(['donation' => $donation], 201);
}
}
