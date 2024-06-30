<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Candidate;
use App\Models\Election;

class CandidateElectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $candidates = Candidate::all();
        $elections = Election::all();

        foreach ($candidates as $candidate) {
            foreach ($elections as $election) {
                $candidate->elections()->attach($election->id);
            }
        }
    }
}
