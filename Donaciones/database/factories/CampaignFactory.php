<?php

// database/factories/CampaignFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Campaign;
use App\Models\User;

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
        ];
    }
}
