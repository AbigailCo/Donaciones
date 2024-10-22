<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class DonationReceived extends Notification implements ShouldQueue
{
    use Queueable;

    protected $amount;
    protected $campaignTitle;

    public function __construct($amount, $campaignTitle)
    {
        $this->amount = $amount;
        $this->campaignTitle = $campaignTitle;
    }

    public function via($notifiable)
    {
        return ['database', 'mail']; // Ajusta los canales que necesites
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "¡Hey! Recibiste una donación de {$this->amount}! Cada vez falta menos para tu meta, ¡felicitaciones!",
            'donation_amount' => $this->amount,
            'campaign_title' => $this->campaignTitle,
        ];
    }

    // aca se puede implementar tomail
}

