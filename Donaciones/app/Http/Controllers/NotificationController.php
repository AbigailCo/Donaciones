<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotifications()
{
    // Asegúrate de que el usuario está autenticado
    if (auth()->check()) {
        // Obtener las notificaciones del usuario autenticado
        $notifications = auth()->user()->notifications; // Cambiado a propiedad
        return response()->json($notifications->sortByDesc('created_at')); // 
    }

    return response()->json(['message' => 'Unauthorized'], 401);
}
}
