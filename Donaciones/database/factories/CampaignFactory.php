<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\CampaignImage;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;

class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition()
    {
        // Coordenadas aleatorias en Argentina
        $latitude = $this->faker->latitude(-55, -22); // Latitud dentro de Argentina
        $longitude = $this->faker->longitude(-73, -53); // Longitud dentro de Argentina

        // Relacionar títulos, descripciones y videos con categorías
        $categories = [
            'salud' => [
                'title' => ['Campaña de vacunación', 'Donaciones para hospital'],
                'description' => [
                    'Apoya nuestra campaña de vacunación en comunidades rurales.',
                    'Ayuda a recaudar fondos para equipar el hospital regional.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Ejemplo
                    'https://www.youtube.com/watch?v=3JZ_D3ELwOQ'
                ],
            ],
            'tecnología' => [
                'title' => ['Educación digital', 'Laboratorio de innovación'],
                'description' => [
                    'Promovemos la educación digital en escuelas públicas.',
                    'Recaudamos fondos para un laboratorio de innovación tecnológica.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
                    'https://www.youtube.com/watch?v=ktvTqknDobU'
                ],
            ],
            'educación' => [
                'title' => ['Materiales escolares', 'Programa de becas'],
                'description' => [
                    'Brindamos materiales escolares a niños de bajos recursos.',
                    'Apoya nuestro programa de becas para jóvenes talentosos.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=9bZkp7q19f0',
                    'https://www.youtube.com/watch?v=J---aiyznGQ'
                ],
            ],
            'medio ambiente' => [
                'title' => ['Reforestación', 'Protección de fauna'],
                'description' => [
                    'Únete a nuestra campaña de reforestación de bosques nativos.',
                    'Recaudamos fondos para proteger especies en peligro de extinción.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=fRh_vgS2dFE',
                    'https://www.youtube.com/watch?v=60ItHLz5WEA'
                ],
            ],
        ];

        // Seleccionar una categoría aleatoria
        $selectedCategory = $this->faker->randomElement(array_keys($categories));
        $categoryData = $categories[$selectedCategory];

        return [
            'title' => $this->faker->randomElement($categoryData['title']),
            'description' => $this->faker->randomElement($categoryData['description']),
            'goal' => $this->faker->numberBetween(1000, 50000),
            'start_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'end_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'user_id' => User::factory(), // Asocia una campaña a un usuario
            'youtube_link' => $this->faker->randomElement($categoryData['youtube_links']), // Video aleatorio
            'category_id' => Category::inRandomOrder()->first()?->id, // Asignar una categoría aleatoria si existe
            'latitude' => $latitude,
            'longitude' => $longitude,
            'address' => 'Argentina', // Usar una dirección genérica para simplificar
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Campaign $campaign) {
            $imageDirectory = public_path('storage/images');
            if (File::exists($imageDirectory)) {
                $images = File::files($imageDirectory);

                if (!empty($images)) {
                    $randomImages = $this->faker->randomElements($images, min(3, count($images)));

                    foreach ($randomImages as $image) {
                        $imageName = basename($image);
                        CampaignImage::create([
                            'campaign_id' => $campaign->id,
                            'path' => $imageName, // Solo almacena el nombre de la imagen
                        ]);
                    }
                }
            }
        });
    }
}
