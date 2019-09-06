<?php

namespace App\Http\Resources;

use App\User;
use App\Product;
use App\Category;
use App\Http\Resources\User as UserResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product as ProductResource;
use App\Http\Resources\Category as CategoryResource;

class Image extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $imageable = null;
        if ($this->imageable_type == User::class) {
            $imageable = new UserResource($this->imageable);
        } else if ($this->imageable_type == Product::class) {
            $imageable = new ProductResource($this->imageable);
        } else if ($this->imageable_type == Category::class) {
            $imageable = new CategoryResource($this->imageable);
        }
        return [
            'id' => $this->id,
            'image' => $this->data,
            'imageable' => $imageable
        ];
    }
}
