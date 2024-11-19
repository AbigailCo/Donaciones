<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = ['campaign_id', 'note'];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}