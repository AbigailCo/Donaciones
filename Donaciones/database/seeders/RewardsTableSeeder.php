<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Reward;
use App\Models\Campaign;

class RewardsTableSeeder extends Seeder
{
    public function run()
    {
        $campaigns = Campaign::all();

        foreach ($campaigns as $campaign) {
            Reward::factory()->count(3)->create([
                'campaign_id' => $campaign->id,
            ]); // Crea 3 recompensas por campaña
        }
    }
}