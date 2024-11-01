<!DOCTYPE html>
<html>
<head>
    <title>Campaña Actualizada</title>
</head>
<body>
    <h1>CAMPAÑA ACTUALIZADA</h1>
    <p>La campaña "{{ $campaign->title }}" ha sido actualizada.</p>
    <p>Nuestra meta es llegar a ${{ number_format($campaign->goal, 2) }}.</p>
    
    @php
        $totalDonado = $campaign->donations()->sum('amount'); // Sumar todas las donaciones
        $goal = $campaign->goal;
        $progress = ($goal > 0) ? ($totalDonado / $goal) * 100 : 0; // Calcular el progreso como un porcentaje
    @endphp

    <p>Total donado: ${{ number_format($totalDonado, 2) }}</p>
    <p>Progreso: {{ number_format($progress, 2) }}%</p>
    <p>¡Gracias por tu apoyo!</p>
</body>
</html>
