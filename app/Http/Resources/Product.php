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
            'slug' => $this->slug,
            'images' => $this->images,
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name
            ],
            'description' => $this->description,
            'meta_description' => $this->meta_description,
            'meta_title' => $this->meta_title,
            'featured' => $this->featured ? true : false,
        ];
    }
}
