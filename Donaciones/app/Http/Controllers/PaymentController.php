<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\Campaign;
use Illuminate\Http\Request;
use MercadoPago\SDK;
use MercadoPago\Preference;
use MercadoPago\Item;

class PaymentController extends Controller
{
    public function createPreference(Request $request)
    {
        // Validación de la solicitud
        $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'amount' => 'required|numeric|min:1',
        ]);

        // Inicializa el SDK con el access token
        SDK::setAccessToken(config('services.mercadopago.access_token'));

        // Crea una nueva preferencia de pago
        $preference = new Preference();

        // Crea un ítem con los detalles de la donación
        $item = new Item();
        $campaign = Campaign::find($request->campaign_id);
        $item->title = 'Donación para ' . $campaign->title;
        $item->quantity = 1;
        $item->unit_price = (float)$request->amount;
        $preference->items = [$item];

        // Configura las URLs de retorno
        $preference->back_urls = [
            'success' => route('donations.success'),
            'failure' => route('donations.failure'),
            'pending' => route('donations.pending'),
        ];
        $preference->auto_return = 'approved';

        // Guarda la preferencia en MercadoPago
        $preference->save();

        // Almacena la donación en la base de datos
        Donation::create([
            'user_id' => auth()->id(),
            'campaign_id' => $request->campaign_id,
            'amount' => $request->amount,
            'payment_status' => 'pending',
        ]);

        // Retorna el ID de la preferencia
        return response()->json([
            'preference_id' => $preference->id,
        ]);
    }

    // Métodos para redireccionar después del pago
    public function success()
    {
        return redirect()->route('campaign.index')->with('success', '¡Pago exitoso!');
    }

    public function failure()
    {
        return redirect()->route('campaign.index')->with('error', 'El pago ha fallado.');
    }

    public function pending()
    {
        return redirect()->route('campaign.index')->with('info', 'El pago está pendiente.');
    }
}
