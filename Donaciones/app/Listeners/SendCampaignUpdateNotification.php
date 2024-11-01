<?php

namespace App\Listeners;

use App\Events\CampaignUpdated;
use App\Mail\CampaignUpdateNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log; // Asegúrate de importar la clase Log

class SendCampaignUpdateNotification
{
    public function handle(CampaignUpdated $event)
    {
        $campaign = $event->campaign;
        $donations = $campaign->donations;

        foreach ($donations as $donation) {
            if (!$donation->email_notification_sent) { // Verifica si ya se envió el correo
                try {
                    Mail::to($donation->user->email)->send(new CampaignUpdateNotification($campaign));
                    $donation->email_notification_sent = true; // Marca como enviado
                    $donation->save(); // Guarda el estado de la donación
                } catch (\Exception $e) {
                    Log::error('Error al enviar correo: ' . $e->getMessage());
                }
            }
        }
    }
}

