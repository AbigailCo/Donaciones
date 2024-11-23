<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Manejar una solicitud entrante.
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->check() && auth()->user()->role === 'admin') {
            return $next($request);
        }

        // Si el usuario no es administrador, se deniega el acceso
        abort(403, 'No tienes acceso a esta sección.');
    }

    
}
