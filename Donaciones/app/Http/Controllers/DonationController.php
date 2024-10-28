<?php

namespace App\Http\Controllers; 

use Illuminate\Http\Request; 
use App\Models\Donation;
use App\Models\Campaign; 


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
            'user_id' => auth()->id(), // Suponiendo que el usuario está autenticado
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
        $campaignOwner = $campaign->user; // Asegúrate de que la relación esté definida en el modelo Campaign

        // Comento lo de notificaciones porque no me salio
        /*
        if ($campaignOwner) {
            // Crear el mensaje de la notificación
            $notificationMessage = [
                'message' => "¡Hey! Recibiste una donación de {$donation->amount}! Cada vez falta menos para tu meta, ¡felicitaciones!",
                'donation_amount' => $donation->amount,
                'campaign_title' => $campaignTitle,
                // Puedes agregar más información según lo necesites
            ];
            
            if ($campaignOwner) {
                // Enviar la notificación con el monto de la donación y el título de la campaña
                $campaignOwner->notify(new DonationReceived($donation->amount, $campaignTitle));
            }
        }
        */

        // Devolver una respuesta exitosa
        return response()->json(['donation' => $donation], 201);
    }

   
}

