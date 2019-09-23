<?php

namespace App\Http\Resources;

use App\Http\Resources\Order as OrderResource;
use App\Http\Resources\Image as ImageResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Address as AddressResource;

class User extends JsonResource
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
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'role' => $this->role->role,
            'verified' => $this->email_verified_at != null,
            'images' => ImageResource::collection($this->image),
            'address' => AddressResource::collection($this->address),
            'orders' => OrderResource::collection($this->orders)
        ];
    }
}
