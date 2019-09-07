<?php

namespace App\Http\Controllers;

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
        return ProductResource::collection(Product::paginate());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required|between:500,5000',
            'category' => 'required|exists:category,id'
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'category_id' => $request->category,
            'description' => $request->description,
        ]);

        return new ProductResource(Product::find($product->id));
    }

    public function update(Request $request, $product)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'description' => 'required|between:500,5000',
            'category' => 'required|exists:category,id'
        ], $this->validationMessages);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        $obj = Product::where('id', $product)->first();
        $obj->name = $request->name;
        $obj->price = $request->price;
        $obj->category_id = $request->category;
        $obj->description = $request->description;
        $obj->save();
        return new ProductResource(Product::find($obj->id));
    }

    public function destroy(Request $request, $product)
    {
        $deleted = Product::where('id', $product)->delete();
        if ($deleted) {
            return response()->json(['message', 'Success! Product was removed from database.'], 200);
        }
        return response()->json(['error', 'Sorry, Something went wrong.'], 400);
    }

    public function show(Request $request, $product)
    {
        return new ProductResource(Product::find($product));
    }
}
