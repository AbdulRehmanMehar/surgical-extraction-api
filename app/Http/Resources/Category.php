<?php

namespace App\Http\Resources;

use App\Product;
use App\Category as CategoryModel;
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
            'parent' => $this->category,
            'images' => $this->images,
            'subcategories' => CategoryModel::where('parent', $this->id)->get(),
        ];
    }
}
