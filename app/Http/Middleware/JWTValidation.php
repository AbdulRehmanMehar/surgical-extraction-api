<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;

class JWTValidation
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
        try
        {
            $payload = JWTAuth::parseToken()->authenticate();
            $request->attributes->add(['user' => $payload]);
            return $next($request);
        }
        catch (\Exception $e)
        {
            return response()->json(['error' => $e->getMessage()], 400);
        }

    }
}
