<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { width: 90%; margin: 0 auto; padding: 20px; }
        .header { background: #f4f4f4; padding: 10px; text-align: center; }
        .button { display: inline-block; padding: 10px 15px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px; }
        .footer { margin-top: 20px; font-size: 0.9em; text-align: center; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Actualización en la Campaña</h2>
        </div>
        <p>Hola, {{ $notifiable->name }},</p>
        <p>Te informamos que la campaña <strong>{{ $campaignTitle }}</strong> ha sido actualizada.</p>
        <p><strong>Nota:</strong> {{ $note->note }}</p>
        <a href="{{ url('/campaigns/' . $campaignTitle) }}" class="button">Ver Campaña</a>
        <p>Gracias por tu apoyo y confianza.</p>
        <div class="footer">
            <p>Resuelve © {{ date('Y') }}</p>
        </div>
    </div>
</body>
</html>
