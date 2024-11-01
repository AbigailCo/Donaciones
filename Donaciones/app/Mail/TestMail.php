<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TestMail extends Mailable
{
    use Queueable, SerializesModels;

    public function build()
    {
        return $this->html('
            <html>
            <body>
                <h1>Hola, este es un correo de prueba</h1>
                <p>Si ves este mensaje, significa que la configuración de correo está funcionando correctamente.</p>
            </body>
            </html>
        ')
        ->subject('Correo de Prueba')
        ->from(config('mail.from.address'), config('mail.from.name'));
    }
}
