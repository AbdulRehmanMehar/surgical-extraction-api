<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //

    protected $fillable = [
        'role', 'user_id'
    ];

    protected $attributes = [
        'role' => 'customer'
    ];

    public function user() {
        return $this->belongsTo('App\User');
    }

}
