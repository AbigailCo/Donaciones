<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;

class AdminController extends Controller
{
    public function index()
    {
        $campaigns = Campaign::all(); // Muestra todas las campañas
        return view('admin.dashboard', compact('campaigns'));
    }
}
