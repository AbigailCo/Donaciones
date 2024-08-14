<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Reward;
use App\Models\Campaign;

class RewardFactory extends Factory
{
    protected $model = Reward::class;

    public function definition()
    {
        return [
            'title' => $this->faker->word,
            'description' => $this->faker->text,
            'amount_required' => $this->faker->numberBetween(100, 5000),
            'campaign_id' => Campaign::factory(),
        ];
    }
}