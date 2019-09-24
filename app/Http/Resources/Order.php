<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Order extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'cart' => $this->cart,
            'status' => $this->status,
            'details' => $this->details,
            'date' => $this->created_at,
            'user' => $this->user,
            'address' => $this->user->address
        ];
    }
}
