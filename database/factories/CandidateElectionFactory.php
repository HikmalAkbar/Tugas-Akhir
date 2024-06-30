<?php

namespace Database\Factories;

use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Database\Eloquent\Factories\Factory;

class CandidateElectionFactory extends Factory
{
    protected $model = \App\Models\CandidateElection::class;

    public function definition()
    {
        return [
            'candidate_id' => Candidate::factory(),
            'election_id' => Election::factory(),
        ];
    }
}
