<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name', 'parent'
    ];

    public function category() {
        return $this->hasOne('App\Category', 'id', 'parent');
    }

    public function products() {
        return $this->hasMany('App\Product', 'id');
    }

    public function images() {
        return $this->morphMany('App\Image', 'imageable');
    }
}
