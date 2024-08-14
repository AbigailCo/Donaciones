<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Donation;
use App\Models\Campaign;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Donation>
 */
class DonationFactory extends Factory
{
    protected $model = Donation::class;

    public function definition()
    {
        return [
            'amount' => $this->faker->numberBetween(10, 5000),
            'campaign_id' => Campaign::factory(),
            'user_id' => User::factory(),
        ];
    }
}
