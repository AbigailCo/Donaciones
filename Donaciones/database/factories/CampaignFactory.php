<?php

namespace Database\Factories;

use App\Models\Campaign;
use App\Models\CampaignImage;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    public function definition()
    {
        // Coordenadas de ejemplo
        $latitude = 40.730610;  // Latitud de Nueva York
        $longitude = -73.935242; // Longitud de Nueva York

        // Llamada a la API de Google Maps para obtener la dirección
        $address = $this->getAddressFromCoordinates($latitude, $longitude);

        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->text,
            'goal' => $this->faker->numberBetween(1000, 50000),
            'start_date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'end_date' => $this->faker->dateTimeBetween('now', '+1 month'),
            'user_id' => User::factory(), // Asocia una campaña a un usuario
            'youtube_link' => $this->faker->optional()->url, // Link de YouTube opcional
            'category_id' => Category::inRandomOrder()->first()?->id, // Asignar una categoría aleatoria si existe
            'latitude' => $latitude,
            'longitude' => $longitude,
            'address' => $address, // Guardar la dirección
        ];
    }

    // Generar múltiples imágenes para la campaña
    public function configure()
    {
        return $this->afterCreating(function (Campaign $campaign) {
            $imageDirectory = public_path('storage/images');
            if (File::exists($imageDirectory)) {
                $images = File::files($imageDirectory);

                if (!empty($images)) {
                    // Limitar a 3 imágenes como máximo
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

    // Método para obtener la dirección a partir de las coordenadas usando la API de Google Maps
    protected function getAddressFromCoordinates($latitude, $longitude)
    {
        $apiKey = env('GOOGLE_MAPS_API_KEY'); // Asegúrate de tener tu clave de API en el archivo .env

        // Llamada a la API de Google Maps para obtener la dirección
        $response = Http::get('https://maps.googleapis.com/maps/api/geocode/json', [
            'latlng' => "{$latitude},{$longitude}",
            'key' => $apiKey
        ]);

        // Verificar si la respuesta es exitosa y registrar la respuesta para depuración
        Log::info('Respuesta de Google Maps:', $response->json());

        if ($response->successful() && isset($response['results'][0]['formatted_address'])) {
            return $response['results'][0]['formatted_address'];
        }

        // Si no se encuentra una dirección, devolver 'Dirección desconocida'
        return 'Dirección desconocida';
    }
}
