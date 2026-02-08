<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/me', function (Request $request) {
    return response()->json([
        'uid' => $request->attributes->get('firebase_uid'),
        'email' => $request->attributes->get('firebase_email'),
    ]);
})->middleware('fb.auth');

Route::get('/debug-auth', function (\Illuminate\Http\Request $request) {
    return response()->json([
        'has_auth' => $request->hasHeader('Authorization'),
        'auth' => $request->header('Authorization'),
    ]);
});
