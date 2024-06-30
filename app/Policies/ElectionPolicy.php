<?php

namespace App\Policies;

use App\Models\Election;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ElectionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine if the given election can be updated by the user.
     */
    public function update(User $user, Election $election)
    {
        return $user->role === 'superadmin' || ($user->role === 'admin' && $user->id === $election->user_id);
    }

    /**
     * Determine if the given election can be deleted by the user.
     */
    public function delete(User $user, Election $election)
    {
        return $user->role === 'superadmin' || ($user->role === 'admin' && $user->id === $election->user_id);
    }

    /**
     * Determine if the given election can be created by the user.
     */
    public function create(User $user)
    {
        return $user->role === 'admin' || $user->role === 'superadmin';
    }
}
