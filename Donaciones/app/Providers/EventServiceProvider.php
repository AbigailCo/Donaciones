<?php

namespace App\Providers;


use App\Events\CampaignUpdated;
use App\Listeners\SendCampaignUpdateNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        CampaignUpdated::class => [
            //SendCampaignUpdateNotification::class,
        ],
    ];

    /* public function boot()
    {
        //
    } */
}
