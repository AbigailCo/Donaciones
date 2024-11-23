<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Campaign;
use App\Models\User;

class AdminController extends Controller
{
    public function __construct()
    {
        // Asegúrate de que solo los administradores puedan acceder
        $this->middleware(function ($request, $next) {
            if (auth()->user()->email !== 'admin@gmail.com') {
                abort(403); // Si no es el admin, denegamos el acceso
            }
            return $next($request);
        });
    }

    public function index()
    {
        // Trae todas las campañas, sin filtro por status
    $campaigns = Campaign::all(); // Si tienes SoftDeletes, usa ->withTrashed()
    
    return view('admin.dashboard', compact('campaigns'));
    }

    public function getUsers()
{
    $users = User::select('id', 'name', 'email', 'created_at') // Selecciona columnas necesarias
                  ->latest()
                  ->paginate(5);

    return response()->json($users);
}

public function deleteUser($id)
{
    // Busca el usuario por ID
    $user = User::find($id);

    // Verifica si el usuario existe
    if (!$user) {
        return response()->json([
            'error' => 'Usuario no encontrado.',
        ], 404);
    }

    // Evita eliminar al administrador principal (opcional)
    if ($user->email === 'admin@gmail.com') {
        return response()->json([
            'error' => 'No puedes eliminar al administrador principal.',
        ], 403);
    }

    // Elimina el usuario
    $user->delete();

    return response()->json([
        'message' => 'Usuario eliminado correctamente.',
    ]);
}


}
