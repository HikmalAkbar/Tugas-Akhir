<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;


class Voter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'nik',
        'address',
        // 'is_used',
        // 'token'
    ];

    // Automatically generate UUID for the token field
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($voter) {
            $voter->token = (string) Str::uuid();
        });
    }

    public function vote()
    {
        return $this->hasOne(Vote::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
