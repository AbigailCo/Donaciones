<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function campaigns()
    {
        return $this->hasMany(Campaign::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    // Cambia este método para referirse a las campañas favoritas directamente
    public function favoritedCampaigns()
    {
        return $this->belongsToMany(Campaign::class, 'favorites');
    }

    // Mantén esta relación si necesitas acceder a la tabla `favorites` a través del modelo `Favorite`
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
}
