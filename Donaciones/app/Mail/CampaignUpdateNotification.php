<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CampaignUpdateNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $campaign;
    public $note; 

    public function __construct($campaign, $note = null) 
    {
        $this->campaign = $campaign;
        $this->note = $note; 
    }

    public function build()
    {
        return $this->subject('Actualización en la Campaña: ' . $this->campaign->title)
                    ->view('emails.campaign_update')
                    ->with([
                        'campaign' => $this->campaign,
                        'note' => $this->note, // Pasar la nota a la vista
                    ]);
    }
}
