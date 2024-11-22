@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Editar Campaña</h1>
    <form action="{{ route('campaigns.update', $campaign->id) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group">
            <label for="title">Título</label>
            <input type="text" class="form-control" id="title" name="title" value="{{ $campaign->title }}">
        </div>
        <div class="form-group">
            <label for="goal">Meta</label>
            <input type="number" class="form-control" id="goal" name="goal" value="{{ $campaign->goal }}">
        </div>
        <div class="form-group">
            <label for="end_date">Fecha de Fin</label>
            <input type="date" class="form-control" id="end_date" name="end_date" value="{{ $campaign->end_date }}">
        </div>
        <button type="submit" class="btn btn-success">Guardar Cambios</button>
    </form>
</div>
@endsection
