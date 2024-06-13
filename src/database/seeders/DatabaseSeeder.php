<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin
        $admin = Admin::factory()->create();

        // Create users
        $users = User::factory()->count(8)->create();

        // Create elections with admin_id and random user_id
        $elections = Election::factory()->count(3)->create([
            'admin_id' => $admin->id,
        ]);

        // Attach elections to each user
        foreach ($elections as $election) {
            $election->users()->attach($users->pluck('id')->toArray());
        }

        // Create candidates
        $candidates = Candidate::factory(5)->create();

        // Attach elections to each candidate
        foreach ($elections as $election) {
            $election->candidates()->attach($candidates->pluck('id')->toArray());
        }

        // // Create votes for some elections
        // Vote::factory()->create([
        //     'voter_id' => $user->id,
        //     'election_id' => $elections[0]->id,
        // ]);

        // Vote::factory()->create([
        //     'voter_id' => $user->id,
        //     'election_id' => $elections[1]->id,
        // ]);
    }
}
