<?php

namespace App\Http\Controllers; 

use Illuminate\Http\Request; 
use App\Models\Donation;
use App\Models\Campaign; 
use App\Notifications\DonationReceived;


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
            'payment_status' => 'paid',  // Asignamos 'pagado' para simular la donación
        ]);

        // Obtener la campaña relacionada
        $campaign = Campaign::find($request->input('campaign_id'));

        // Actualizar el total donado en la campaña
        $campaign->total_donated += $donation->amount;
        $campaign->save();
        
           // Obtener el título de la campaña y el usuario de la campaña
           $campaignTitle = $campaign->title;
           $campaignOwner = $campaign->user; // Esto asume que tienes la relación definida en el modelo Campaign
   
           // Enviar notificación al creador de la campaña
           if ($campaignOwner) {
               $campaignOwner->notify(new DonationReceived($donation->amount, $campaignTitle));
           }

        // Devolver una respuesta exitosa
        return response()->json(['donation' => $donation], 201);
        
    }
}


/*
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
            'payment_status' => 'paid',  // Asignamos 'pagado' para simular la donacion
        ]);

        // Devolver una respuesta exitosa
        return response()->json(['donation' => $donation], 201);
    }
}*/
