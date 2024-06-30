<?php

namespace App\Policies;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CandidatePolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given candidate can be updated by the user.
     */
    public function update(User $user, Candidate $candidate)
    {
        return $user->id === $candidate->user_id;
    }

    /**
     * Determine if the given candidate can be deleted by the user.
     */
    public function delete(User $user, Candidate $candidate)
    {
        return $user->id === $candidate->user_id;
    }
}
