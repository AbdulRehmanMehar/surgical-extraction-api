<?php

namespace App\Http\Controllers;

use App\FeaturedProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\FeaturedProduct as FeaturedResource;

class FeaturedController extends Controller
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
        return FeaturedResource::collection(FeaturedProduct::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'product' => 'required|exists:products,id'
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }
        $featured = FeaturedProduct::where('product_id', $request->product)->first();
        if (!$featured) {
            $featured = FeaturedProduct::create([
                'product_id' => $request->product
            ]);
        }

        return new FeaturedResource(FeaturedProduct::find($featured->id));
    }

    public function destroy(Request $request, $featured)
    {
        $deleted = FeaturedProduct::where('product_id', $featured)->delete();
        if ($deleted) {
            return response()->json(['message', 'Success! FeaturedProduct was removed from database.'], 200);
        }
        return response()->json(['error', 'Sorry, Something went wrong.'], 400);
    }

    public function show(Request $request, $featured)
    {
        return new FeaturedResource(FeaturedProduct::find($featured));
    }
}
