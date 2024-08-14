<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Donation;
use App\Models\User;
use App\Models\Campaign;

class DonationsTableSeeder extends Seeder
{
    public function run()
    {
        $campaigns = Campaign::all();
        $users = User::all();
        
        foreach ($campaigns as $campaign) {
            foreach ($users->random(3) as $user) { 
                Donation::factory()->create([
                    'campaign_id' => $campaign->id,
                    'user_id' => $user->id,
                ]);
            }
        }
    }
}
