<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
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
        $users = User::factory(5)->create();

        // Create elections with admin_id and random user_id
        $elections = Election::factory(3)->create([
            'admin_id' => $admin->id,
        ]);

        // Attach elections to each user
        foreach ($elections as $election) {
            $election->users()->sync($users->pluck('id')->toArray());
        }

        // Create candidates
        $candidates = Candidate::factory(5)->create();

        // Attach elections to each candidate
        foreach ($elections as $election) {
            $election->candidates()->sync($candidates->pluck('id')->toArray());
        }
    }
}
