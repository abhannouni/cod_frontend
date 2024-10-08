<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/products', [ProductController::class, 'create']);
Route::delete('/products/{id}', [ProductController::class, 'delete']);
Route::get('/products', [ProductController::class, 'browse']);

Route::post('/categories', [CategoryController::class, 'create']);
Route::get('/categories', [CategoryController::class, 'browse']);
Route::delete('/categories/{id}', [CategoryController::class, 'delete']);

Route::get('/token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return response()->json(['token' => $token]);
});
