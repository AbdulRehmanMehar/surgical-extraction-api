<?php

namespace App\Http\Controllers;

use App\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Address as AddressResource;

class AddressController extends Controller
{
    private $validationMessages = [
        'required' => 'The :attribute field is required.',
        'email' => 'The :attribute value :input is not valid.',
        'unique' => 'The :attribute value :input already exsists.',
        'between' => 'The :attribute value :input is not between :min - :max.',
        'exists' => 'The :attribute value :input is not valid.'
    ];

    public function index(Request $request)
    {
        $user = $request->attributes->get('user');
        return AddressResource::collection($user->address);
    }

    public function store(Request $request)
    {
        $user = $request->attributes->get('user');
        $validator = Validator::make($request->all(), [
            'state' => 'required',
            'country' => 'required',
            'address' => 'required|between:50,500',
        ], $this->validationMessages);

        if ($validator->fails())
        {
            return response() - json(['error' => $validator->errors()], 401);
        }

        $address = Address::create([
            'state' => $request->state,
            'country' => $request->country,
            'address' => $request->address,
            'user_id' => $user->id
        ]);

        return new AddressResource(Address::find($address->id));
    }

    public function update(Request $request, $address)
    {
        $user = $request->attributes->get('user');
        $validator = Validator::make($request->all(), [
            'state' => 'required',
            'country' => 'required',
            'address' => 'required|between:50,500',
        ], $this->validationMessages);

        if ($validator->fails())
        {
            return response() - json(['error' => $validator->errors()], 401);
        }

        $obj = Address::find($address)->where('user_id', $user->id)->first();
        $obj->state = $request->state;
        $obj->country = $request->country;
        $obj->address = $request->address;
        $obj->save();
        return new AddressResource(Address::find($obj->id));
    }

    public function destroy(Request $request, $address)
    {
        $user = $request->attributes->get('user');
        $deleted = Address::find($address)->where('user_id', $user->id)->delete();
        if ($deleted)
        {
            return response()->json(['message', 'Success! Address was removed from database.'], 200);
        }
        return response()->json(['message', 'Sorry, Something went wrong.'], 400);
    }

    public function show(Request $request, $address)
    {
        $user = $request->attributes->get('user');
        return new AddressResource(Address::find($address)->where('user_id', $user->id));
    }
}
