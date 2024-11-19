<!DOCTYPE html>
<html>
<head>
    <title>Actualización en la Campaña</title>
</head>
<body>
    <h1>Actualización en la campaña: {{ $campaign->title }}</h1>
    @if($note)
        <p>{{ $note->note }}</p>
    @else
        <p>¡Gracias por tu donación y apoyo continuo!</p>
    @endif
</body>
</html>