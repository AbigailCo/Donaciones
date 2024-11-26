<?php

namespace Database\Seeders;

use App\Models\Campaign;
use App\Models\User;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CampaignsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create('es_ES');
        $users = User::all();

        $categories = [
            'Educación' => [
                [
                    'title' => 'Becas para estudiantes',
                    'description' => 'Ayuda a estudiantes con recursos limitados a continuar sus estudios.',
                    'image' => 'educacion/educacion1.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=e_KH4whUiT4',
                    'goal' => 12000.00,
                    'start_date' => '2024-09-01',
                    'end_date' => '2025-09-01',
                ],
                [
                    'title' => 'Construcción de escuelas rurales',
                    'description' => 'Construiremos aulas en zonas rurales para mejorar el acceso a la educación.',
                    'image' => 'educacion/educacion2.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=qG7zYW2o0Uo',
                    'goal' => 2000.00,
                    'start_date' => '2024-10-11',
                    'end_date' => '2024-11-01',
                ],
                [
                    'title' => 'Clases gratuitas de programación',
                    'description' => 'Ofrecemos talleres gratuitos de tecnología para jóvenes.',
                    'image' => 'educacion/educacion3.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=s43aiz5aNRQ',
                    'goal' => 29000.00,
                    'start_date' => '2024-02-01',
                    'end_date' => '2024-09-01',
                ],
                [
                    'title' => 'Distribución de útiles escolares',
                    'description' => 'Entregaremos materiales escolares a niños en situación vulnerable.',
                    'image' => 'educacion/educacion4.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=QO23Z3XSwi4',
                    'goal' => 77000.00,
                    'start_date' => '2024-09-20',
                    'end_date' => '2024-12-01',
                ],
                [
                    'title' => 'Capacitación docente',
                    'description' => 'Cursos especializados para mejorar las técnicas pedagógicas de los maestros.',
                    'image' => 'educacion/educacion5.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=efM6M0QsUf4',
                    'goal' => 300.00,
                    'start_date' => '2024-09-01',
                    'end_date' => '2024-09-03',
                ]
            ],
            'Salud' => [
                [
                    'title' => 'Campaña de vacunación',
                    'description' => 'Proveer vacunas esenciales a comunidades vulnerables.',
                    'image' => 'salud/salud1.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=XMFieM1yVj0',
                    'goal' => 32000.00,
                    'start_date' => '2024-06-01',
                    'end_date' => '2025-08-01',
                ],
                [
                    'title' => 'Equipamiento para hospitales',
                    'description' => 'Adquisición de equipos médicos modernos para hospitales rurales.',
                    'image' => 'salud/salud2.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=D9oyWuIKa20',
                    'goal' => 55000.00,
                    'start_date' => '2024-11-01',
                    'end_date' => '2024-12-05',
                ],
                [
                    'title' => 'Atención médica gratuita',
                    'description' => 'Organizamos brigadas médicas para ofrecer consultas gratuitas.',
                    'image' => 'salud/salud3.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=c0tK5Dl4LXo',
                    'goal' => 34320.00,
                    'start_date' => '2024-11-01',
                    'end_date' => '2024-12-30',
                ],
                [
                    'title' => 'Donación de sangre',
                    'description' => 'Fomentamos la donación de sangre para salvar vidas.',
                    'image' => 'salud/salud4.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=8yZzhqIn2D8',
                    'goal' => 43340.00,
                    'start_date' => '2024-05-01',
                    'end_date' => '2024-11-05',
                ],
                [
                    'title' => 'Campañas de prevención de enfermedades',
                    'description' => 'Realizamos campañas educativas para prevenir enfermedades comunes.',
                    'image' => 'salud/salud4.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=tOUUknaRzMc',
                    'goal' => 55000.00,
                    'start_date' => '2024-11-30',
                    'end_date' => '2024-12-10',
                ]
            ],
            'Tecnología' => [
                [
                    'title' => 'Desarrollo de aplicaciones móviles',
                    'description' => 'Creamos aplicaciones móviles innovadoras para mejorar la experiencia del usuario.',
                    'image' => 'tecnologia/tecnologia1.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=3_dwKqCsbis',
                    'goal' => 34300.00,
                    'start_date' => '2023-11-01',
                    'end_date' => '2024-01-05',
                ],
                [
                    'title' => 'Inteligencia artificial',
                    'description' => 'Investigamos y desarrollamos soluciones de inteligencia artificial para optimizar procesos.',
                    'image' => 'tecnologia/tecnologia2.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=_tA5cinv0U8',
                    'goal' => 55000.00,
                    'start_date' => '2024-11-01',
                    'end_date' => '2024-12-05',
                ],
                [
                    'title' => 'Robótica educativa',
                    'description' => 'Ofrecemos kits y programas educativos para aprender robótica desde temprana edad.',
                    'image' => 'tecnologia/tecnologia3.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=bHOrWkkXWmM',
                    'goal' => 55000.00,
                    'start_date' => '2024-12-01',
                    'end_date' => '2024-12-05',
                ],
                [
                    'title' => 'Blockchain y criptomonedas',
                    'description' => 'Exploramos el uso de blockchain y criptomonedas para transformar las finanzas digitales.',
                    'image' => 'tecnologia/tecnologia4.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=Yn8WGaO__ak',
                    'goal' => 55000.00,
                    'start_date' => '2024-02-01',
                    'end_date' => '2024-10-05',
                ],
                [
                    'title' => 'Realidad aumentada',
                    'description' => 'Desarrollamos experiencias de realidad aumentada para mejorar la interacción con el usuario.',
                    'image' => 'tecnologia/tecnologia5.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=NfQPkY0cp2I',
                    'goal' => 55000.00,
                    'start_date' => '2024-10-01',
                    'end_date' => '2024-11-05',
                ]
            ],
            'Animales' => [
                [
                    'title' => 'Castraciones',
                    'description' => 'Castra a tus animales para evitar el abandono y superpoblacion',
                    'image' => 'animales/animales1.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=6kbqgt0EHqk',
                    'goal' => 55000.00,
                    'start_date' => '2024-11-01',
                    'end_date' => '2024-12-05'
                ],
                [
                    'title' => 'Refugios para perros y gatos',
                    'description' => 'Brindamos refugio y cuidados médicos a perros y gatos abandonados.',
                    'image' => 'animales/animales2.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=p_2T3thirHY',
                    'goal' => 52300.00,
                    'start_date' => '2024-11-01',
                    'end_date' => '2024-12-05',
                ],
                [
                    'title' => 'Adopta',
                    'description' => 'Luchamos por la protección de las mascotas.',
                    'image' => 'animales/animales3.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=BADpJckj764',
                    'goal' => 23240.00,
                    'start_date' => '2024-11-01',
                    'end_date' => '2024-12-05',
                ],
                [
                    'title' => 'Protección a los callejeros',
                    'description' => 'Desarrollamos programas para la proteccion de los callejeros',
                    'image' => 'animales/animales4.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=oHRIYfFxEBs',
                    'goal' => 23240.00,
                    'start_date' => '2024-10-01',
                    'end_date' => '2024-12-05',
                ],
                [
                    'title' => 'Educación sobre animales',
                    'description' => 'Realizamos talleres educativos sobre la importancia de preservar a los animales.',
                    'image' => 'animales/animales5.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=YHmHFgSknxE',
                    'goal' => 55000.00,
                    'start_date' => '2023-11-01',
                    'end_date' => '2024-12-05',
                ]
            ],
            
            'Medio Ambiente' => [
                [
                    'title' => 'Reforestación de bosques',
                    'description' => 'Trabajamos en la reforestación de áreas deforestadas para recuperar la biodiversidad.',
                    'image' => 'ambiente/ambiente1.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=myCDs63sb88',
                    'goal' => 5400.00,
                    'start_date' => '2024-04-01',
                    'end_date' => '2024-12-20',
                ],
                [
                    'title' => 'Reciclaje y reducción de residuos',
                    'description' => 'Promovemos el reciclaje y la reducción de residuos en comunidades y empresas.',
                    'image' => 'ambiente/ambiente2.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=tbTYxFbzLWA',
                    'goal' => 2000.00,
                    'start_date' => '2024-08-01',
                    'end_date' => '2024-12-05',
                ],
                [
                    'title' => 'Protección de especies en peligro',
                    'description' => 'Trabajamos para la conservación de especies en peligro de extinción y sus hábitats naturales.',
                    'image' => 'ambiente/ambiente3.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=wJhAJMwLUvM',
                    'goal' => 534340.00,
                    'start_date' => '2024-08-05',
                    'end_date' => '2025-03-08',
                ],
                [
                    'title' => 'Energía renovable',
                    'description' => 'Fomentamos el uso de energías renovables como la solar y eólica para reducir el impacto ambiental.',
                    'image' => 'ambiente/ambiente4.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=Og6C1HyeaBs',
                    'goal' => 3400.00,
                    'start_date' => '2024-11-01',
                    'end_date' => '2024-12-05',
                ],
                [
                    'title' => 'Limpieza de océanos y playas',
                    'description' => 'Organizamos jornadas de limpieza en playas y océanos para proteger la fauna marina.',
                    'image' => 'ambiente/ambiente5.jpg', // Esta imagen será seleccionada aleatoriamente desde una carpeta
                    'youtube_link' => 'https://www.youtube.com/watch?v=J49kPZiDTno',
                    'goal' => 3440.00,
                    'start_date' => '2024-11-01',
                    'end_date' => '2024-12-05',
                ]
            ]
        ];

        foreach ($categories as $category => $campaigns) {
            // Selección aleatoria de user_id
            $userId = DB::table('users')->inRandomOrder()->value('id');

            // Generación de coordenadas para América Latina
            $latitude = $this->generateRandomLatitude();
            $longitude = $this->generateRandomLongitude();

            // Generar uno de alias, CVU o CBU
            [$alias, $cvu, $cbu] = $this->generatePaymentMethod();

            // Insertar en la base de datos
            DB::table('campaigns')->insert([
                'category_id' => DB::table('categories')->where('name', $categoryName)->value('id'),
                'title' => $campaign['title'],
                'description' => $campaign['description'],
                'goal' => $campaign['goal'],
                'total_donated' => 0.00,
                'start_date' => $campaign['start_date'],
                'end_date' => $campaign['end_date'],
                'user_id' => $userId,
                'image' => $randomImage,
                'youtube_link' => $campaign['youtube_link'],
                'latitude' => $latitude,
                'longitude' => $longitude,
                'address' => 'Dirección de ejemplo',
                'alias' => $alias,
                'cvu' => $cvu,
                'cbu' => $cbu,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
            }
        }

        /* if ($users->isEmpty()) {
            // Si no hay usuarios, creamos algunos
            $users = User::factory(10)->create();
        }

        Campaign::factory()->count(5)->create([
            'user_id' => $users->random()->id,  // Asignar a un usuario aleatorio
        ]); */
    }
    private function getImagesFromFolder($folderPath)
    {
        if (!is_dir($folderPath)) {
            return [];
        }

        // Escanea los archivos en la carpeta y filtra solo las imágenes
        $files = scandir($folderPath);
        return array_filter($files, function ($file) use ($folderPath) {
            $filePath = $folderPath . '/' . $file;
            return is_file($filePath) && preg_match('/\.(jpg|jpeg|png|gif)$/i', $file);
        });
    }
}
