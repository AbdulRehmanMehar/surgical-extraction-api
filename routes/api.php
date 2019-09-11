<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');
Route::post('/register', 'AuthController@register');
Route::post('/get-user', 'AuthController@get_user');
Route::post('/reset-password', 'AuthController@reset_password');
Route::post('/verify-email/{id}', 'AuthController@verify_email');
Route::get('/reset-password/{id}', 'AuthController@reset_password');
Route::post('/delete-account/{id}', 'AuthController@delete_account');
Route::get('/cancel-reset-password/{id}', 'AuthController@cancel_reset_request');

Route::resource('address', 'AddressController', [
    'except' => ['edit', 'create']
]);
Route::resource('category', 'CategoryController', [
    'except' => ['edit', 'create']
]);
Route::resource('product', 'ProductController', [
    'except' => ['edit', 'create']
]);
Route::resource('image', 'ImageController', [
    'except' => ['edit', 'create']
]);
Route::resource('featured-product', 'FeaturedController', [
    'except' => ['edit', 'create', 'update']
]);

