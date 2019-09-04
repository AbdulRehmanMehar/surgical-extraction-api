<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Category as CategoryResource;

class CategoryController extends Controller
{
    private $validationMessages = [
        'required' => 'The :attribute field is required.',
        'email' => 'The :attribute value :input is not valid.',
        'unique' => 'The :attribute value :input already exsists.',
        'between' => 'The :attribute value :input is not between :min - :max.',
        'exists' => 'The :attribute value :input is not valid.'
    ];

    public function __construct() {
        $this->middleware('faculity', ['except' => ['index', 'show']]);
    }

    public function index(Request $request)
    {
        return CategoryResource::collection(Category::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'parent' => 'nullable|exists:categories,id'
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response() - json(['error' => $validator->errors()], 401);
        }

        $category = Category::create([
            'name' => $request->name,
            'parent' => $request->parent
        ]);

        return new CategoryResource(Category::find($category->id));
    }

    public function update(Request $request, $category)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'parent' => 'nullable|exists:categories,id'
        ], $this->validationMessages);


        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $obj = Category::where('id', $category)->first();
        $obj->name = $request->name;
        $obj->parent = $request->parent;
        $obj->save();
        return new CategoryResource(Category::find($obj->id));
    }

    public function destroy(Request $request, $category)
    {
        $deleted = Category::where('id', $category)->delete();
        if ($deleted) {
            return response()->json(['message', 'Success! Category was removed from database.'], 200);
        }
        return response()->json(['message', 'Sorry, Something went wrong.'], 400);
    }

    public function show(Request $request, $category)
    {
        return new CategoryResource(Category::find($category));
    }
}
