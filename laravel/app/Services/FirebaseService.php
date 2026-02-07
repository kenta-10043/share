<?php

namespace App\Services;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;

class FirebaseService
{
    public function auth(): Auth
    {
        $credentials = config('firebase.credentials');

        return (new Factory)
            ->withServiceAccount(base_path($credentials))
            ->createAuth();
    }
}
