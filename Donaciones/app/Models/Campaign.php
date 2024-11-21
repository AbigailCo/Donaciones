<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Campaign extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'goal',
        'start_date',
        'end_date',
        'user_id',
        'youtube_link',
        'category_id',
        'latitude',
        'longitude',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    public function rewards()
    {
        return $this->hasMany(Reward::class);
    }

    public function images()
    {
        return $this->hasMany(CampaignImage::class, 'campaign_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function favoritedByUsers()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }

    public function creator()
{
    return $this->belongsTo(User::class, 'user_id');
}
    
    public function notes()
{
    return $this->hasMany(Note::class);
}
}
