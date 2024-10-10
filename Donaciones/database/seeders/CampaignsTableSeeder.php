<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Campaign;
use App\Models\User;

class CampaignsTableSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();

        if ($users->isEmpty()) {
            // Si no hay usuarios, creamos algunos
            $users = User::factory(10)->create();
        }

        Campaign::factory()->count(5)->create([
            'user_id' => $users->random()->id,  // Asignar a un usuario aleatorio
        ]); 
    }
}
