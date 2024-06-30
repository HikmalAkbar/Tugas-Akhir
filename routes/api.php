<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CandidateController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ElectionController;
use App\Http\Controllers\Api\VoteController;
use App\Http\Controllers\Api\VoterController;
use App\Http\Controllers\Api\HomePageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
    Route::apiResource('/candidates', CandidateController::class);
    Route::apiResource('/voters', VoterController::class);
    Route::apiResource('/votes', VoteController::class);
    Route::apiResource('/elections', ElectionController::class);

    // Route::middleware('role:admin')->group(function () {
    // });

    Route::get('/elections/count', [ElectionController::class, 'count']);
    Route::get('/candidates/count', [CandidateController::class, 'count']);
    Route::get('/voters/count', [VoterController::class, 'count']);
    Route::get('/users/count', [UserController::class, 'count']);

});

Route::get('/home/online-elections', [HomePageController::class, 'getOnlineElections']);
Route::get('/home/semi-online-elections', [HomePageController::class, 'getSemiOnlineElections']);

Route::get('/home/elections/{id}', [HomePageController::class, 'showElection']);
Route::post('/home/vote', [HomePageController::class, 'vote']);

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
