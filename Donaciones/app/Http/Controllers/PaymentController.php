<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\Preference;
use MercadoPago\SDK;
use MercadoPago\Item;

class PaymentController extends Controller
{
    public function createPreference(Request $request)
    {
        // Inicializa el SDK con tu access token
        SDK::setAccessToken(config('services.mercadopago.access_token'));

        // Crea una preferencia de pago
        $preference = new Preference();

        // Crea un ítem de donación
        $item = new Item();
        $item->title = 'Donación a ' . $request->input('campaign_title');
        $item->quantity = 1;
        $item->unit_price = (float)$request->input('amount'); // Monto de la donación
        $preference->items = array($item);

        // Define la URL de retorno
        $preference->back_urls = array(
            "success" => url('/donation/success'),
            "failure" => url('/donation/failure'),
            "pending" => url('/donation/pending')
        );
        $preference->auto_return = "approved";

        // Guarda la preferencia y retorna el ID
        $preference->save();

        return response()->json([
            'preference_id' => $preference->id,
        ]);
    }
}
