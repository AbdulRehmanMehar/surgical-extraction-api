<?php

namespace App\Http\Controllers;

use App\User;
use App\Image;
use App\Product;
use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Image as ImageResource;

class ImageController extends Controller
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
    }

    public function index(Request $request)
    {
        return ImageResource::collection(Image::paginate());
    }

    public function store(Request $request)
    {
        $imageable_type = null;
        $role = $request->attributes->get('user')->role->role;
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:jpeg,bmp,png,gif,svg,pdf|max:2000',
            'imageable_id' => 'nullable',
            'imageable_type' => 'nullable'
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        if ($role && $request->imageable_id && $request->imageable_type) {
            if ($request->imageable_type == 'user') $imageable_type = User::class;
            if ($request->imageable_type == 'product' && $role != 'customer') $imageable_type = Product::class;
            if ($request->imageable_type == 'category' && $role != 'customer') $imageable_type = Category::class;
            if ($imageable_type != null && !$imageable_type::where('id', $request->imageable_id)->first()) {
                return response()->json(['error' => 'Invalid imageable id.'], 401);
            }
        }

        $image = Image::create([
            'data' => base64_encode(file_get_contents($request->file('image'))),
            'imageable_id' => $request->imageable_id,
            'imageable_type' => $imageable_type
        ]);

        return new ImageResource(Image::find($image->id));
    }

    public function update(Request $request, $image)
    {
        $base64 = null;
        $imageable_type = null;
        $role = $request->attributes->get('user')->role->role;
        $validator = Validator::make($request->all(), [
            'image' => 'nullable|mimes:jpeg,bmp,png,gif,svg,pdf|max:2000',
            'imageable_id' => 'nullable',
            'imageable_type' => 'nullable'
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        if ($role && $request->imageable_id && $request->imageable_type) {
            if ($request->imageable_type == 'user') $imageable_type = User::class;
            if ($request->imageable_type == 'product' && $role != 'customer') $imageable_type = Product::class;
            if ($request->imageable_type == 'category' && $role != 'customer') $imageable_type = Category::class;
            if ($imageable_type != null && !$imageable_type::where('id', $request->imageable_id)->first()) {
                return response()->json(['error' => 'Invalid imageable id.'], 401);
            }
        }

        if ($request->hasFile('image')) {
            $base64 = base64_encode(file_get_contents($request->file('image')));
        }

        $obj = Image::where('id', $image)->first();
        $obj->data = $base64 || $obj->data;
        $obj->imageable_id = $request->imageable_id;
        $obj->imageable_type = $request->imageable_type;

        return new ImageResource(Image::find($obj->id));
    }

    public function destroy(Request $request, $image)
    {
        $deleted = false;
        $var = Image::where('id', $image)->first();
        $user = $request->attributes->get('user');
        if ($var->imageable_type == User::class && $var->imageable_id == $user->id) {
            $deleted = $var->delete();
        } else if ($user->role->role && $user->role->role != 'customer') {
            $deleted = true;
        }
        if ($deleted) {
            return response()->json(['message', 'Success! Image was removed from database.'], 200);
        }
        return response()->json(['error', 'Sorry, Something went wrong.'], 400);
    }

    public function show(Request $request, $image)
    {
        return new ImageResource(Image::find($image));
    }
}
