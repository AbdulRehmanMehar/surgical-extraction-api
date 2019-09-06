<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'price', 'description', 'category'
    ];

    public function category() {
        return $this->belongsTo('App\Category');
    }

    public function images() {
        return $this->morphMany('App\Image', 'imageable');
    }

    public function featured() {
        return $this->hasOne('App\FeaturedProduct');
    }
}
