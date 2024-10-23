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
        $campaignOwner = $campaign->user; 

        // Devolver una respuesta exitosa
        return response()->json(['donation' => $donation], 201);
    }
}
