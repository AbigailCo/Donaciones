<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       User::factory(20)->create();
       User::create([
        'name' => 'Admin',
        'email' => 'admin@gmail.com',
        'password' => Hash::make('admin123'), // Encriptar la contraseña
        'role' => 'admin', // Asigna un rol
        'created_at' => now(),
        'updated_at' => now(),
    ]);
   
       $this->call([
        CategorySeeder::class,  
    ]);
    Campaign::factory(30)->create();
    $this->call([
       
        DonationsTableSeeder::class,   
    ]);
    }
}
