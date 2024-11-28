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
        $this->middleware(function ($request, $next) {
            if (auth()->user()->role !== 'admin') {
                abort(403); // Si no es el admin, denegamos el acceso
            }
            return $next($request);
        });
    }

    public function index()
    {
        // Trae todas las campañas, sin filtro 
    $campaigns = Campaign::all(); 
    
    return response()->json($campaigns);

    }

    public function getUsers()
{
    $users = User::select('id', 'name', 'email', 'role', 'created_at', 'status') 
                  ->latest()
                  ->paginate(5);

    return response()->json($users);
}

public function deleteUser($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'error' => 'Usuario no encontrado.',
        ], 404);
    }

    // Evito eliminar al administrador principal 
    if ($user->role === 'admin') {
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

public function assignAdmin($id)
{
    $user = User::find($id);
    if (!$user) {
        return response()->json([
            'error' => 'Usuario no encontrado.',
        ], 404);
    }

   
    $user->role = 'admin';
    $user->save();

    return response()->json([
        'message' => 'El usuario ha sido promovido a administrador.',
        'user' => $user, // Devuelve el usuario actualizado
    ]);
}

public function removeAdmin($id)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json([
            'error' => 'Usuario no encontrado.',
        ], 404);
    }

    // Verifico si el usuario actual es un administrador
    if ($user->role !== 'admin') {
        return response()->json([
            'error' => 'El usuario no es administrador.',
        ], 400);
    }

    // Evito que todos los administradores sean eliminados
    $remainingAdmins = User::where('role', 'admin')->count();

    if ($remainingAdmins <= 1) {
        return response()->json([
            'error' => 'Debe haber al menos un administrador en el sistema.',
        ], 403);
    }

    // Cambio el rol del usuario a un rol user
    $user->role = 'user';
    $user->save();

    return response()->json([
        'message' => 'El rol de administrador ha sido removido.',
        'user' => $user,
    ]);
}


public function updateStatus($id, $status)
{
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    }

    if (!in_array($status, ['active', 'disabled'])) {
        return response()->json(['message' => 'Estado no válido'], 400);
    }

    $user->status = $status;
    $user->save();

    return response()->json(['message' => 'Estado del usuario actualizado', 'user' => $user], 200);
}




}
