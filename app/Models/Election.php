<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'user_id',
        'description',
        'location',
        'startDate',
        'endDate',
        'startTime',
        'endTime',
        'type',
        // 'password'
    ];

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function candidates()
    {
        return $this->belongsToMany(Candidate::class, 'candidate_election');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
