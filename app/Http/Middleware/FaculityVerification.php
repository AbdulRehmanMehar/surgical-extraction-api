<?php

namespace App\Http\Middleware;

use Closure;

class FaculityVerification
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = $request->attributes->get('user');
        if ($user != null && $user->role->role != null && $user->role->role != 'customer')
            return $next($request);
        return response()->json(['error' => 'Sorry, you cannot access this route.'], 400);
    }
}
