<!DOCTYPE html>
<html>
<head>
    <title>Actualización de la Campaña</title>
</head>
<body>
    <h1>¡La campaña "{{ $campaign->title }}" ha sido actualizada!</h1>
    
    <p>La campaña que apoyaste ha recibido una nueva actualización. Aquí están los detalles:</p>
    
    <p><strong>Meta:</strong> "{{ $campaign->goal }}"</p>
    <p><strong>Total donado:</strong> "{{ $campaign->total_donated }}"</p>
    

    <p>Gracias por tu continuo apoyo a esta causa.</p>

    <p>¡Juntos estamos más cerca de lograr la meta!</p>

    <p>Visita la campaña para más detalles: <a href="{{ url('/campaigns/'.$campaign->id) }}">Ver Campaña</a></p>
</body>
</html>
