<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Campaign;
use App\Models\User;
use App\Models\CampaignImage;
use Illuminate\Support\Facades\File;

class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->text,
            'goal' => $this->faker->numberBetween(1000, 50000),
            'start_date' => $this->faker->date,
            'end_date' => $this->faker->date,
            'user_id' => User::factory(), // Asocia una campaña a un usuario
            'youtube_link' => $this->faker->optional()->url, // Link de YouTube opcional
        ];
    }

    // Generar múltiples imágenes para la campaña
    public function configure()
    {
        return $this->afterCreating(function (Campaign $campaign) {
            $imageDirectory = public_path('storage/images');
            $images = File::files($imageDirectory);

            // Limitar a 3 imágenes como máximo, ajusta según tus necesidades
            $randomImages = $this->faker->randomElements($images, 3);

            foreach ($randomImages as $image) {
                $imageName = basename($image);
                CampaignImage::create([
                    'campaign_id' => $campaign->id,
                    'path' => $imageName, // Solo almacena el nombre de la imagen
                ]);
            }
        });
    }
}
