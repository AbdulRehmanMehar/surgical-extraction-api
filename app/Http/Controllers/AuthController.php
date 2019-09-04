<?php

namespace App\Http\Controllers;

use App\User;
use App\Role;
use Carbon\Carbon;
use App\PasswordReset;
use App\Mail\VerifyEmail;
use App\Mail\ResetPassword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{

    private $validationMessages = [
        'required' => 'The :attribute field is required.',
        'email' => 'The :attribute value :input is not valid.',
        'unique' => 'The :attribute value :input already exsists.',
        'between' => 'The :attribute value :input is not between :min - :max.'
    ];

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|between:5,20',
            'email' => 'required|unique:users|email:rfc',
            'phone' => 'required|unique:users|between:10,15',
            'password' => 'required|same:confirm_password'
        ], $this->validationMessages);

        if ($validator->fails())
        {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $user = User::create([
            'name'    => $request->name,
            'email'    => $request->email,
            'phone'    => $request->phone,
            'password' => $request->password,
        ]);

        $role = Role::create([
            'role'   => 'customer',
            'user_id' => $user->id
        ]);

        Mail::to($user->email)->send(new VerifyEmail($user));
        return $this->respondWithToken($user);
    }

    public function login(Request $request)
    {
        $user = null;
        $validator = Validator::make($request->all(), [
            'email' => 'required',
            'password' => 'required'
        ], $this->validationMessages);

        if ($validator->fails())
        {
            return response()-json(['error' => $validator->errors()], 401);
        }

        if (filter_var($request->email, FILTER_VALIDATE_EMAIL))
        {
            $credentials = request(['email', 'password']);
            $user = User::where('email', $request->email)->first();
        }
        else
        {
            $user = User::where('phone', $request->email)->first();
            $credentials = ['phone' => $request->email, 'password' => $request->password];
        }


        if (! $token = auth()->attempt($credentials))
        {
            return response()->json(['error' => 'Invalid Credentials were provided.'], 401);
        }

        return $this->respondWithToken($user);
    }

    public function reset_password(Request $request, $id)
    {
        if ($request->isMethod('post'))
        {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email'
            ], $this->validationMessages);

            if ($validator->fails())
            {
                return response()->json(['error' => $validator->errors()], 401);
            }

            if (! $user = User::where('email', $request->email)->first())
            {
                return response()->json(['error' => 'Invalid Credentials were provided.'], 401);
            }

            PasswordReset::where('email', $user->email)->delete();

            $reset = PasswordReset::create([
                'email' => $user->email,
                'token' => auth()->login($user)
            ]);

            Mail::to($user->email)->send(new ResetPassword($reset));
            return response()->json(['message' => 'Success! Verification email was sent to your email address.']);
        }
        else
        {
            $reset = PasswordReset::with('user')->where('id', $id)->first();
            $user = $reset->user;
            $reset->delete();
            return $this->respondWithToken($user);
        }
    }

    public function cancel_reset_request($id)
    {
        $deleted = PasswordReset::where('id', $id)->delete();
        if ($deleted)
        {
            return response()->json(['message' => 'Success! Request was canceled.'], 200);
        }
        return response()->json(['message' => 'Invalid Id. No request was found.'], 400);
    }

    public function verify_email($id)
    {
        $user = User::where('uid', $id)->first();
        $user->email_verified_at = Carbon::now()->toDateTimeString();
        if ($user->save())
        {
            return response()->json(['message' => 'Success! your email address is now verified.'], 200);
        }
        else
        {
            return response()->json(['error' => 'Sorry, Something went wrong.'], 400);
        }
    }

    public function delete_account($id)
    {
        $user = User::where('uid', $id)->first();
        if ($user->delete())
        {
            return response()->json(['message' => 'Success! your credentials were deleted from db.'], 200);
        }
        return response()->json(['error' => 'Sorry, Something went wrong.'], 400);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken(User $user)
    {
        return response()->json([
            'user' => $user,
            'access_token' => auth()->login($user),
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60
        ]);
    }
}
