<?php

// database/factories/CampaignFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Campaign;
use App\Models\User;
use Illuminate\Support\Facades\File;

class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition()
    {
        // Usa public_path() para obtener los archivos de la carpeta public/images
        $imageDirectory = public_path('images');
        $images = File::files($imageDirectory);

        // Obtén una imagen aleatoria
        $imagePath = $this->faker->randomElement($images);

        // Obtén el nombre de archivo sin la ruta completa
        $imageName = basename($imagePath);

        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->text,
            'goal' => $this->faker->numberBetween(1000, 50000),
            'start_date' => $this->faker->date,
            'end_date' => $this->faker->date,
            'user_id' => User::factory(), // Asocia una campaña a un usuario
            'image' => $imageName, // Guarda solo el nombre de la imagen
        ];
    }
}
