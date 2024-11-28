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
            'email_notification_sent' => false,
        ]);

        $campaign = Campaign::find($request->input('campaign_id'));
        $campaign->total_donated += $donation->amount;
        $campaign->save();
        $donorName = auth()->user()->name;
      
        $campaignCreator = $campaign->user; 
    
        if ($campaignCreator) {
            // Enviar notificación al creador de la campaña
            $campaignCreator->notify(new DonationReceived($donation->amount, $campaign->title, $donorName, $campaign->id));

            try {
            } catch (\Exception $e) {
                Log::error('Error al enviar correo al creador de la campaña: ' . $e->getMessage());
            }
        }
    
        // Devolver una respuesta exitosa
        return response()->json(['donation' => $donation], 201);
    }
    
}
