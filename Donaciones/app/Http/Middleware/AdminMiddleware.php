<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        if (auth()->check()) {
            $user = auth()->user();
            
            // Verificar si es administrador y si está habilitado
            if ($user->role === 'admin' && $user->status === 'active') {
                return $next($request);
            }

            // Usuario deshabilitado
            if ($user->status !== 'active') {
                auth()->logout(); 
                return redirect('/')->with('error', 'Tu cuenta está deshabilitada.');
            }
        }

        return redirect('/')->with('error', 'No tienes acceso a esta sección.');
    }
}
