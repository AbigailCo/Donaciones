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
                'title' => [
                    'Campaña de vacunación',
                    'Donaciones para hospital',
                    'Prevención de enfermedades',
                    'Programa de salud mental',
                    'Ayuda para tratamientos médicos costosos'
                ],
                'description' => [
                    'Apoya nuestra campaña de vacunación en comunidades rurales.',
                    'Ayuda a recaudar fondos para equipar el hospital regional.',
                    'Promovemos campañas para prevenir enfermedades comunes.',
                    'Proporcionamos apoyo para programas de salud mental.',
                    'Recaudamos fondos para personas que necesitan tratamientos costosos.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=XMFieM1yVj0',
                    'https://www.youtube.com/watch?v=D9oyWuIKa20',
                    'https://www.youtube.com/watch?v=c0tK5Dl4LXo',
                    'https://www.youtube.com/watch?v=8yZzhqIn2D8',
                    'https://www.youtube.com/watch?v=tOUUknaRzMc'
                ],
            ],
            'tecnología' => [
                'title' => [
                    'Educación digital',
                    'Laboratorio de innovación',
                    'Robótica para niños',
                    'Acceso a internet rural',
                    'Desarrollo de aplicaciones comunitarias'
                ],
                'description' => [
                    'Promovemos la educación digital en escuelas públicas.',
                    'Recaudamos fondos para un laboratorio de innovación tecnológica.',
                    'Introducimos a los niños al mundo de la robótica.',
                    'Trabajamos para brindar acceso a internet en áreas rurales.',
                    'Apoyamos el desarrollo de aplicaciones para resolver problemas comunitarios.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=3_dwKqCsbis',
                    'https://www.youtube.com/watch?v=_tA5cinv0U8',
                    'https://www.youtube.com/watch?v=bHOrWkkXWmM',
                    'https://www.youtube.com/watch?v=Yn8WGaO__ak',
                    'https://www.youtube.com/watch?v=NfQPkY0cp2I'
                ],
            ],
            'Educación' => [
                'title' => [
                    'Materiales escolares',
                    'Programa de becas',
                    'Capacitación docente',
                    'Clases extracurriculares',
                    'Bibliotecas móviles'
                ],
                'description' => [
                    'Brindamos materiales escolares a niños de bajos recursos.',
                    'Apoya nuestro programa de becas para jóvenes talentosos.',
                    'Ofrecemos programas de capacitación para docentes.',
                    'Implementamos clases extracurriculares para estudiantes.',
                    'Promovemos la lectura mediante bibliotecas móviles.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=e_KH4whUiT4',
                    'https://www.youtube.com/watch?v=qG7zYW2o0Uo',
                    'https://www.youtube.com/watch?v=s43aiz5aNRQ',
                    'https://www.youtube.com/watch?v=QO23Z3XSwi4',
                    'https://www.youtube.com/watch?v=efM6M0QsUf4'
                ],
            ],
            'medio ambiente' => [
                'title' => [
                    'Reforestación',
                    'Protección de fauna',
                    'Energías renovables',
                    'Limpieza de océanos',
                    'Educación ambiental'
                ],
                'description' => [
                    'Únete a nuestra campaña de reforestación de bosques nativos.',
                    'Recaudamos fondos para proteger especies en peligro de extinción.',
                    'Fomentamos el uso de energías renovables.',
                    'Organizamos campañas para limpiar océanos y costas.',
                    'Enseñamos sobre prácticas sostenibles en comunidades.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=myCDs63sb88',
                    'https://www.youtube.com/watch?v=tbTYxFbzLWA',
                    'https://www.youtube.com/watch?v=wJhAJMwLUvM',
                    'https://www.youtube.com/watch?v=Og6C1HyeaBs',
                    'https://www.youtube.com/watch?v=J49kPZiDTno'
                ],
            ],
            'animales' => [
                'title' => [
                    'Refugio para animales',
                    'Campaña de adopción',
                    'Atención veterinaria gratuita',
                    'Protección de especies en peligro',
                    'Alimentos para animales abandonados'
                ],
                'description' => [
                    'Ayuda a mantener un refugio seguro para animales sin hogar.',
                    'Promovemos campañas de adopción responsable.',
                    'Ofrecemos atención veterinaria gratuita a familias necesitadas.',
                    'Protegemos especies en peligro de extinción.',
                    'Recaudamos fondos para alimentar animales abandonados.'
                ],
                'youtube_links' => [
                    'https://www.youtube.com/watch?v=6kbqgt0EHqk',
                    'https://www.youtube.com/watch?v=p_2T3thirHY',
                    'https://www.youtube.com/watch?v=BADpJckj764',
                    'https://www.youtube.com/watch?v=oHRIYfFxEBs',
                    'https://www.youtube.com/watch?v=YHmHFgSknxE'
                ],
            ],
        ];

        // Seleccionar una categoría aleatoria
        $selectedCategory = $this->faker->randomElement(array_keys($categories));
        $categoryData = $categories[$selectedCategory];

        $title = $this->faker->randomElement($categoryData['title']);
        $description = $categoryData['description'][array_search($title, $categoryData['title'])];

        // Lógica para determinar si la campaña está cerrada
        $isClosed = $this->faker->boolean(30); // 30% de probabilidad de que la campaña esté cerrada

        // Si está cerrada, la fecha de cierre debe ser antes de la fecha actual
        $endDate = $isClosed 
            ? $this->faker->dateTimeBetween('-2 months', '-1 day') 
            : $this->faker->dateTimeBetween('now', '+2 months'); 

        // Definir el total_donated: Puede ser un valor cercano o mayor al goal
        $goal = $this->faker->numberBetween(1000, 50000);
        $totalDonated = $this->faker->boolean(50) // 50% de probabilidad de que el donativo sea mayor al goal
            ? $this->faker->numberBetween($goal, $goal + 20000) // Supera el goal
            : $this->faker->numberBetween($goal - 10000, $goal + 5000); // Casi llega o lo supera levemente

        return [
            'title' => $title,
            'description' => $description,
            'goal' => $goal,
            'start_date' => $this->faker->dateTimeBetween('-2 month', 'now'),
            'end_date' => $endDate,
            'user_id' => User::inRandomOrder()->first()->id, 
            'youtube_link' => $this->faker->randomElement($categoryData['youtube_links']),
            'category_id' => Category::firstWhere('name', $selectedCategory)?->id,
            'latitude' => $latitude,
            'longitude' => $longitude,
            'total_donated' => $totalDonated, // Agregar el monto donado
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Campaign $campaign) {
            $imageDirectory = public_path("storage/categorias/{$campaign->category->name}");

            if (File::exists($imageDirectory)) {
                $images = File::files($imageDirectory);

                if (!empty($images)) {
                    $randomImages = $this->faker->randomElements($images, min(3, count($images)));

                    foreach ($randomImages as $image) {
                        CampaignImage::create([
                            'campaign_id' => $campaign->id,
                            'path' => $image->getFilename(),
                        ]);
                    }
                }
            }
        });
    }
}
