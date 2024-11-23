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
                  ->paginate(10);

    return response()->json($users);
}
}
