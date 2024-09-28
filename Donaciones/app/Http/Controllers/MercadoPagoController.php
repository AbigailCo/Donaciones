<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class MercadoPagoController extends Controller
{
    public function createPayment(Request $request)
    {
        $access_token = env('MERCADO_PAGO_ACCESS_TOKEN'); // Cargar desde .env

        $client = new Client([
            'base_uri' => 'https://api.mercadopago.com/',
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => "Bearer $access_token"
            ]
        ]);

        // Recoger los datos del request
        $preference_data = [
            "items" => [
                [
                    "title" => $request->title, // Título del producto
                    "quantity" => $request->quantity,
                    "unit_price" => $request->unit_price,
                ]
            ],
            "back_urls" => [
                "success" => "http://localhost:3000/success",
                "failure" => "http://localhost:3000/failure",
                "pending" => "http://localhost:3000/pending"
            ],
            "auto_return" => "approved"
        ];

        try {
            $response = $client->post('checkout/preferences', [
                'json' => $preference_data
            ]);

            $preference = json_decode($response->getBody(), true);

            return response()->json($preference);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
