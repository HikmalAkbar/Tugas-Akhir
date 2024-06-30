<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
// use App\Providers\Gate;
use Illuminate\Support\Facades\Gate;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\Voter;
use App\Policies\CandidatePolicy;
use App\Policies\ElectionPolicy;
use App\Policies\VoterPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Election::class => ElectionPolicy::class,
        Voter::class => VoterPolicy::class,
        Candidate::class => CandidatePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::define('create-election', function (User $user) {
            return in_array($user->role, ['superadmin', 'admin']);
        });
    }
}
