<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\FirebaseService;

class FirebaseAuth
{
    public function handle(Request $request, Closure $next)
    {
        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer')) {
            return response()->json(['massage' => 'トークンがありません'], 401);
        }

        $idToken = substr($authHeader, 7);

        try {
            $firebaseAuth = app(FirebaseService::class)->auth();
            $verifiedToken = $firebaseAuth->verifyIdToken($idToken);

            $uid = $verifiedToken->claims()->get('sub');

            $email = $verifiedToken->claims()->get('email') ?? null;

            $request->attributes->set('firebase_uid', $uid);
            $request->attributes->set('firebase_email', $email);

            return $next($request);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Invalid token',
                'error' => $e->getMessage(),
            ], 401);
        }
    }
}
