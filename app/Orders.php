<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{

    protected $fillable = [
        'status', 'details', 'cart', 'user_id',
    ];

    protected $attributes = [
        'status' => 'placed',
        'details' => 'Order Just got placed.'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }


}
