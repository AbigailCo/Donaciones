<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NoteImage extends Model
{
    protected $fillable = ['note_id', 'path'];

    // Relación con las notas
    public function note()
    {
        return $this->belongsTo(Note::class);
    }
}
