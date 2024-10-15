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
        'category_id'
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
}
