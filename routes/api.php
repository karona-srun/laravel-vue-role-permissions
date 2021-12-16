<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ForgotPasswordController;
use App\Http\Controllers\API\ResetPasswordController;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('sign-in', 'API\AuthController@login');
    Route::post('sign-up', 'API\AuthController@register');
    Route::post('password/email', 'API\PasswordResetRequestController@forgot');
    Route::post('password/reset', 'API\PasswordResetRequestController@reset');
});
 
Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'auth'
], function () {
    Route::post('refresh', 'API\AuthController@refresh');
    Route::post('me', 'API\AuthController@me');
    Route::post('sign-out', 'API\AuthController@logout');
});

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::get('user','API\UsersController@index');
    Route::post('user','API\UsersController@store');
    Route::post('user-livesearch', 'API\UsersController@liveSearch');
    Route::get('user/{id}','API\UsersController@show');
    Route::patch('user/{id}','API\UsersController@update');
    Route::delete('user/{id}','API\UsersController@destroy');
});