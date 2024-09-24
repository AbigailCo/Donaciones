<?php

namespace App\Http\Controllers; // Asegúrate de que la declaración del namespace esté presente

use Illuminate\Http\Request; // Importa Request
use App\Models\Donation; // Asegúrate de importar tu modelo Donation
use MercadoPago\SDK; // Importa el SDK de Mercado Pago
use MercadoPago\Preference; // Importa la clase Preference de Mercado Pago
use MercadoPago\Item; // Importa la clase Item de Mercado Pago

class DonationController extends Controller
{
    public function create(Request $request)
    {
        // Validar los datos de entrada
        $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'amount' => 'required|numeric|min:1',
        ]);

        // Configurar el SDK de Mercado Pago
        
        SDK::setAccessToken(env('MP_ACCESS_TOKEN'));
        try {
            // Crear la preferencia de pago
            $preference = new Preference();
            $item = new Item();
            $item->title = 'Donación a la campaña ' . $request->campaign_id;
            $item->quantity = 1;
            $item->currency_id = 'ARS';
            $item->unit_price = (float)$request->input('amount');

            $preference->items = array($item);
            $preference->save();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear la preferencia de pago: ' . $e->getMessage()], 500);
        }

        // Guardar la donación en la base de datos
        $donation = Donation::create([
            'campaign_id' => $request->input('campaign_id'),
            'user_id' => auth()->id(),
            'amount' => $request->input('amount'),
            'payment_status' => 'pending',
            'preference_id' => $preference->id,
        ]);

        return response()->json(['init_point' => $preference->init_point, 'donation' => $donation], 201);
    }
}
