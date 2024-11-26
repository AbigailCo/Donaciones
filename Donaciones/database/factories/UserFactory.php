<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Carpeta de imágenes de perfil
        $profileDirectory = public_path('storage/perfil');

        // Si el directorio existe, obtiene las imágenes
        if (File::exists($profileDirectory)) {
            $images = File::files($profileDirectory);

            // Si hay imágenes, selecciona una aleatoria
            if (!empty($images)) {
                $randomImage = $this->faker->randomElement($images);
                $profileImagePath = $randomImage->getFilename();
            } else {
                $profileImagePath = null; // No hay imágenes disponibles
            }
        } else {
            $profileImagePath = null; // No existe la carpeta
        }

        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'profile_picture' => $profileImagePath, // Almacena la ruta de la imagen de perfil
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
