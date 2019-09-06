<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Image as ImageResource;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\FeaturedProduct as FeaturedResource;
class Product extends JsonResource
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
            'price' => $this->price,
            'images' => ImageResource::collection($this->images),
            'category' => new CategoryResource($this->category),
            'featured' => new FeaturedResource($this->featured),
        ];
    }
}
