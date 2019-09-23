<?php

namespace App\Http\Controllers;

use App\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\Order as OrderResource;

class OrderController extends Controller
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
        $this->middleware('jwtauth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->attributes->get('user');
        if ($user->role->role && $user->role->role != 'customer') {
            if ($request->has('type')) return OrderResource::collection(Orders::where('status', $request->type)->paginate());
            return OrderResource::collection(Orders::paginate());
        }
        if ($request->has('type')) return OrderResource::collection(Orders::where('user_id', $user->id)->where('status', $request->type)->paginate());
        return OrderResource::collection(Orders::where('user_id', $user->id)->paginate());

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->attributes->get('user');
        $validator = Validator::make($request->all(), [
            'cart' => 'required',
        ], $this->validationMessages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        $order = Orders::create([
            'cart' => $request->cart,
            'user_id' => $user->id
        ]);

        return new OrderResource(Orders::find($order->id));

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $user = $request->attributes->get('user');
        if ($user->role->role && $user->role->role != 'customer') {
            return new OrderResource(Orders::where('id', $id));
        }
        return new OrderResource(Orders::where('id', $id)->where('user_id', $user->id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = $request->attributes->get('user');
        $validator = Validator::make($request->all(), [
            'status' => 'required',
            'details' => 'required'
        ], $this->validationMessages);

        if ($validator->fails() || ($user->role->role == 'customer' && $request->status != 'canceled')) {
            return response()->json(['errors' => $validator->errors()], 401);
        }

        $order = Orders::where('id', $id)->first();
        $order->status = $request->status;
        $order->details = $request->details;
        $order->save();
        return new OrderResource(Orders::where('id', $order->id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->attributes->get('user');
        $deleted = Address::where('id', $id)->first();
        if ($user->role->role != 'customer' && $deleted->delete()) {
            return response()->json(['message', 'Success! Order was removed from database.'], 200);
        }
        return response()->json(['error', 'Sorry, Something went wrong.'], 400);
    }
}
