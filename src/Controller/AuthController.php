<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class AuthController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function register(): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Register success!'
        ]);
    }
    #[Route('/login', name: 'app_login')]
    public function login(): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Login success!'
        ]);
    }
    #[Route('/logout', name: 'app_logout')]
    public function logout(): JsonResponse
    {
        return new JsonResponse([
            'message' => 'Logout success!'
        ]);
    }
}
