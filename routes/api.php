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
    'namespace' => 'App\Http\Controllers\API',
    'prefix' => 'auth'
], function () {
        Route::post('password/email', 'PasswordResetRequestController@forgot');
        Route::post('password/reset', 'PasswordResetRequestController@reset');
        // Send reset password mail
        // Route::post('reset-password', 'PasswordResetRequestController@sendPasswordResetLink');
        // handle reset password form process
        // Route::post('reset/password', 'PasswordResetRequestController@callResetPassword');
    });
    
Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers\API',
    'prefix' => 'auth'
], function () {
    Route::post('sign-in', 'AuthController@login');
    Route::post('sign-up', 'AuthController@register');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('logout', 'AuthController@logout');
});
