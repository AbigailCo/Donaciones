@extends('app')


@section('content')
<div id="admin-dashboard" data-campaigns="{{ json_encode($campaigns) }}"></div>

    <div class="container">
        <h1>Panel de Administración</h1>
        <h2>Campañas</h2>
        <table class="table">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Meta</th>
                    <th>Fecha de Fin</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($campaigns as $campaign)
                    <tr>
                        <td>{{ $campaign->title }}</td>
                        <td>${{ $campaign->goal }}</td>
                        <td>{{ $campaign->end_date }}</td>
                        <td>
                            <a href="{{ route('campaigns.edit', $campaign->id) }}" class="btn btn-primary">Editar</a>
                            <form action="{{ route('campaigns.destroy', $campaign->id) }}" method="POST" style="display:inline;">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-danger" onclick="return confirm('¿Estás seguro?')">Eliminar</button>
                            </form>
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection

