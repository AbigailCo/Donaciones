<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Storage;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create('es_ES'); // Para datos en español
        $imageFiles = collect(glob(public_path('storage/perfil/*')))->map(function ($path) {
            return basename($path); // Solo el nombre del archivo
        });
        foreach (range(1, 20) as $index) {
           
            DB::table('users')->insert([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'role' => 'user',
                'email_verified_at' => now(),
                'password' => Hash::make('password123'), // Contraseña por defecto
                'remember_token' => $faker->lexify('??????????'),
                'profile_picture' => '' . $imageFiles->random(), // Asignar una imagen aleatoria
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
