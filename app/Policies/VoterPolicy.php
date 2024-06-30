<?php

namespace App\Policies;

use App\Models\Voter;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class VoterPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given voter can be updated by the user.
     */
    public function update(User $user, Voter $voter)
    {
        return $user->id === $voter->user_id;
    }

    /**
     * Determine if the given voter can be deleted by the user.
     */
    public function delete(User $user, Voter $voter)
    {
        return $user->id === $voter->user_id;
    }
}
