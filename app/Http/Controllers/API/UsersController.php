<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::get();
        return response()->json(['users' => $users ],200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|between:2,100',
            'lastname' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                $validator->errors()->first()]
            , 200);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            [   'is_admin' => $request->is_admin,
                'active' => $request->active,
                'avatar' => $request->avatar,
                'desc' => $request->desc,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
                'password' => bcrypt($request->password)
            ]
        ));

        return response()->json([
            'status' => 'success',
            'message' => 'User successfully created',
            'user' => $user
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        if (is_null($user)) {
			return response()->json([
                "success" => false,
                "message" => "User not found."
            ]);
		}
        return response()->json([
            "success" => true,
            "user" => $user
        ], 200);
    }

    public function liveSearch(Request $request)
    {
        $query = $request->keyword;
        $users = User::where('firstname', 'like', '%' . $query . '%')
            // ->orWhere('lastname', 'like', '%' . $query . '%')
            // ->orWhere('email', 'like', '%' . $query . '%')
            // ->orWhere('desc', 'like', '%' . $query . '%')
            ->get();
        return response()->json(['users'=>$users],200); 
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
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|between:2,100',
            'lastname' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                $validator->errors()->first()]
            , 200);
        }

        $user = User::find($id);
        $user->firstname = $request->firstname; 
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->is_admin = $request->is_admin ?? true; 
        $user->active = $request->active ?? true;
        $user->avatar = $request->avatar;
        $user->desc = $request->desc ?? ' ';
        $user->updated_by = Auth::user()->id;
        if($request->password){
            $user->password = bcrypt($request->password);
        }
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User successfully updated',
            'user' => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        if (is_null($user)) {
			return response()->json([
                "success" => false,
                "message" => "User not found."
            ]);
		}
        $user->delete();
        return response()->json([
            "success" => true,
            "message" => "User deleted successfully.",
            "data" => $user
        ]);
    }
}
