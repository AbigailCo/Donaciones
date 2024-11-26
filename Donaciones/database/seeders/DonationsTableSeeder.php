<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Donation;
use App\Models\User;
use App\Models\Campaign;

class DonationsTableSeeder extends Seeder
{
    public function run()
    {
        $campaigns = Campaign::all();
        $users = User::all();
        
        foreach ($campaigns as $campaign) {
            // Obtener un número aleatorio de usuarios entre 1 y 20
            $randomUsersCount = rand(1, 20);

            // Seleccionar aleatoriamente los usuarios
            foreach ($users->random($randomUsersCount) as $user) {
                // Crear una donación con una fecha de creación aleatoria
                Donation::factory()->create([
                    'campaign_id' => $campaign->id,
                    'user_id' => $user->id,
                    'created_at' => now()->subDays(rand(0, 30)), // Fecha aleatoria en los últimos 30 días
                   
                ]);
            }
        }
    }
}
