<?php

namespace App\Http\Resources;

use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;


class Address extends JsonResource
{

    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        try
        {
            return [
                'id' => $this->id,
                'state' => $this->state,
                'country' => $this->country,
                'address' => $this->address,
                'user' => new UserResource($this->user),
            ];
        }
        catch (\Exception $e) {
            return [
                'error' => $e->getMessage()
            ];
        }
    }
}
