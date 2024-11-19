<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class CampaignUpdated extends Notification implements ShouldQueue
{
    use Queueable;

    protected $note;
    protected $campaignTitle;

    public function __construct($note, $campaignTitle)
    {
        $this->note = $note;
        $this->campaignTitle = $campaignTitle;
    }

    public function via($notifiable)
    {
        return ['database', 'mail'];
    }

    public function toArray($notifiable)
    {
        return [
            'message' => "La campaña '{$this->campaignTitle}' ha sido actualizada con una nueva nota: '{$this->note->note}'.",
            'note_content' => $this->note->note,
            'campaign_title' => $this->campaignTitle,
        ];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->greeting('Hola!')
                    ->line("La campaña '{$this->campaignTitle}' ha sido actualizada.")
                    ->line("Nota: {$this->note->note}")
                    ->action('Ver Campaña', url("/campaigns/{$notifiable->id}"))
                    ->line('¡Gracias por tu apoyo!');
    }
}
