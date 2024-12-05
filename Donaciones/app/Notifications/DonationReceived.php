<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class DonationReceived extends Notification implements ShouldQueue
{
    use Queueable;

    protected $amount;
    protected $campaignTitle;
    protected $donador;
    protected $campaignId;

    public function __construct($amount, $campaignTitle, $donador, $campaignId)
    {
        $this->amount = $amount;
        $this->campaignTitle = $campaignTitle;
        $this->donador = $donador;
        $this->campaignId = $campaignId;
    }

    public function via($notifiable)
    {
        return ['database', 'mail']; 
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "¡Hey! Recibiste una donación de {$this->amount}! Cada vez falta menos para tu meta, ¡felicitaciones!",
            'donation_amount' => $this->amount,
            'campaign_title' => $this->campaignTitle,
        ];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('¡Has recibido una nueva donación!')
            ->greeting("¡Hola, {$notifiable->name}!")
            ->line("Nos complace informarte que has recibido una nueva donación en tu campaña {$this->campaignTitle}")
            ->line("**Donación recibida:** {$this->amount}")
            ->line("**Donante:** {$this->donador}") 
            ->action('Ver campaña', url("/campaigns/{$this->campaignId}"))
            ->line("Si tienes problemas para hacer clic en el botón 'Ver campaña', copia y pega la siguiente URL en tu navegador:")
            ->line(url("/campaigns/{$this->campaignId}"))
            ->line("Gracias por confiar en nuestra plataforma para alcanzar tus objetivos.")
            ->salutation('Saludos, el equipo de DarVuelve');
    }
}
