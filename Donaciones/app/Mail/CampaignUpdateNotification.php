<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CampaignUpdateNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $campaign;

    public function __construct($campaign)
    {
        $this->campaign = $campaign;
    }

    public function build()
    {
        return $this->subject('Actualización en la Campaña: ' . $this->campaign->title)
                    ->view('emails.campaign_update');
    }
}
