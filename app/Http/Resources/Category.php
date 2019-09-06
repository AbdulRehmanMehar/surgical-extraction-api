<?php

namespace App\Http\Resources;

use App\Http\Resources\Image as ImageResource;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Product as ProductResource;
use App\Http\Resources\Category as CategoryResource;

class Category extends JsonResource
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
            'parent' => new CategoryResource($this->category),
            'images' => ImageResource::collection($this->images),
            'products' => ProductResource::collection($this->products),
        ];
    }
}
