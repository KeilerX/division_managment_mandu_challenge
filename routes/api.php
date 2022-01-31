<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DivisionController;

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

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */
Route::get('/divisions', [DivisionController::class, 'index']);
Route::get('/divisions/{division}', [DivisionController::class, 'show']);
Route::post('/divisions', [DivisionController::class, 'store']);
Route::put('/divisions/{division}', [DivisionController::class, 'update']);
Route::delete('/divisions/{division}', [DivisionController::class, 'destroy']);
Route::get('/sub-divisions/{division}', [DivisionController::class, 'indexSubdivisions']);
Route::get('/search', [DivisionController::class, 'search']);
Route::get('/filters', [DivisionController::class, 'indexFilters']);
Route::get('/filter-data', [DivisionController::class, 'filterData']);