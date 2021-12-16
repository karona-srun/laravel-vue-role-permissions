<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;
    use SendsPasswordResetEmails;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'is_admin',
        'active',
        'avatar',
        'desc',
        'password',
        'created_by',
        'updated_by'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'email_verified_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['full_name'];

    // The function name will need to start with `get`and ends with `Attribute`
    // with the attribute field in-between in camel case.
    public function getFullNameAttribute() // notice that the attribute name is in CamelCase.
    {
        return ucfirst($this->firstname) . ' ' . ucfirst($this->lastname);
    }

    public function getCreatedByAttribute() // notice that the attribute name is in CamelCase.
    {
        $user = User::find(Auth::user()->id);
        return ucfirst($user->firstname) . ' ' . ucfirst($user->lastname);
    }

    public function getUpdatedByAttribute() // notice that the attribute name is in CamelCase.
    {
        $user = User::find(Auth::user()->id);
        return ucfirst($user->firstname) . ' ' . ucfirst($user->lastname);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() {
        return [];
    }  
    
    /**
     * Prepare a date for array / JSON serialization.
     */
    protected function serializeDate(DateTimeInterface $date) : string
    {
        return $date->format('d-m-Y  H:i:s A');
    }

    public function creator()
    {
        return $this->belongsTo('App\Models\User','created_by');
    }

    public function updater()
    {
        return $this->belongsTo('App\Models\User','updated_by');
    }
}
