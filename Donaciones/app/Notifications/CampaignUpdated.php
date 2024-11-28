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
    protected $campaignId;

    public function __construct($note, $campaignTitle,  $campaignId)
    {
        $this->note = $note;
        $this->campaignTitle = $campaignTitle;
        $this->campaignId = $campaignId;
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
            ->subject("Actualización en la campaña: {$this->campaignTitle}")
            ->greeting("¡Hola, {$notifiable->name}!") 
            ->line("Te informamos que la campaña **'{$this->campaignTitle}'** ha sido actualizada con nuevos avances.")
            ->line("**Actualizacion:** {$this->note->note}")
            ->action('Ver campaña', url("/campaigns/{$this->campaignId}"))           
            ->line("Agradecemos tu interés en esta campaña y tu continuo apoyo.")
            ->salutation('Saludos, el equipo de Dar Vuelve')
            ->line("Si tienes problemas para hacer clic en el botón 'Ver campaña', copia y pega la siguiente URL en tu navegador:")
            ->line(url("/campaigns/{$this->campaignId}"));
    }

}
