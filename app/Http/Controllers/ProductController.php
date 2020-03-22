<?php

namespace App\Http\Controllers;

use App\Image;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Product as ProductResource;

class ProductController extends Controller
{
    private $validationMessages = [
        'required' => 'The :attribute field is required.',
        'email' => 'The :attribute value :input is not valid.',
        'unique' => 'The :attribute value :input already exsists.',
        'between' => 'The :attribute value :input is not between :min - :max.',
        'exists' => 'The :attribute value :input is not valid.'
    ];

    public function __construct()
    {
        $this->middleware('jwtauth', ['except' => ['index', 'show']]);
        $this->middleware('faculity', ['except' => ['index', 'show']]);
    }

    public function index(Request $request)
    {
        if ($request->has('category')) {
            if ($request->has('search')) {
                return ProductResource::collection(Product::where('category_id', $request->category)->where('name', 'like', '%'. $request->search .'%')->paginate());
            }
            return ProductResource::collection(Product::where('category_id', $request->category)->paginate());
        }
        return ProductResource::collection(Product::paginate());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'meta_title' => 'required',
            'meta_description' => 'required',
            'description' => 'required|min:150',
            'category' => 'required|exists:categories,id'
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        // $product = Product::create([
        //     'name' => $request->name,
        //     'price' => $request->price,
        //     'description' => $request->description,
        // ]);


        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->name)));
        $product->category_id = $request->category;
        $product->description = $request->description;
        $product->meta_title = $request->meta_title;
        $product->meta_description = $request->meta_description;
        $product->save();
        return new ProductResource(Product::find($product->id));
    }

    public function update(Request $request, $product)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'meta_title' => 'required',
            'meta_description' => 'required',
            'description' => 'required|min:150',
            'category' => 'required|exists:categories,id'
        ], $this->validationMessages);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        $obj = Product::where('id', $product)->first();
        $obj->name = $request->name;
        $obj->price = $request->price;
        $obj->slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $request->name)));
        $obj->category_id = $request->category;
        $obj->meta_title = $request->meta_title;
        $obj->meta_description = $request->meta_description;
        $obj->description = $request->description;
        $obj->save();
        return new ProductResource(Product::find($obj->id));
    }

    public function destroy(Request $request, $product)
    {
        $obj = Product::where('id', $product)->first();
        $obj->images()->delete();
        $obj->featured()->delete();
        $deleted = $obj->delete();
        if ($deleted) {
            return response()->json(['message' => 'Success! Product was removed from database.'], 200);
        }
        return response()->json(['error' => 'Sorry, Something went wrong.'], 400);
    }

    public function show(Request $request, $product)
    {
        if (gettype($product) == "string") {

            return new ProductResource(Product::where('slug', $product)->first());
        } else {

            return new ProductResource(Product::where('id',$product)->first());
        }
    }
}
