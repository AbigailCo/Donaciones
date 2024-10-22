<?php
namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DonationReceived extends Notification
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
        return ['database']; // Cambia esto según cómo quieras enviar la notificación (email, SMS, etc.)
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "¡Has recibido una donación de {$this->amount} para '{$this->campaignTitle}'! ¡Cada vez falta menos para llegar a la meta!",
            'amount' => $this->amount,
            'campaign_title' => $this->campaignTitle,
        ];
    }
}
