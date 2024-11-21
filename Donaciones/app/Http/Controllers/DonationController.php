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
    
        // Obtener al creador de la campaña
        $campaignCreator = $campaign->creator; // Asume que Campaign tiene una relación 'creator'
    
        if ($campaignCreator) {
            // Enviar notificación al creador de la campaña
            $campaignCreator->notify(new DonationReceived($donation->amount, $campaign->title));
    
            // Enviar correo al creador de la campaña
            try {
                Mail::to($campaignCreator->email)->send(new CampaignUpdateNotification($campaign));
            } catch (\Exception $e) {
                Log::error('Error al enviar correo al creador de la campaña: ' . $e->getMessage());
            }
        }
    
        // Devolver una respuesta exitosa
        return response()->json(['donation' => $donation], 201);
    }
    
}
