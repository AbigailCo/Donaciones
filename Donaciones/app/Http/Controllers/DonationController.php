<?php

namespace App\Http\Controllers; 

use Illuminate\Http\Request; 
use App\Models\Donation;

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
}

