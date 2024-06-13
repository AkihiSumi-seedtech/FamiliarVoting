<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Admin;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_voter_index()
    {
        $admin = Admin::factory()->create();
        $user = User::factory()->create();
        $candidate = Candidate::factory()->create();

        // Create elections
        $elections = Election::factory(3)->create([
            'admin_id' => $admin->id
        ]);

        // Attach elections to the user
        $user->elections()->attach($elections->pluck('id'));
        // Attach elections to candidate
        foreach ($elections as $election) {
            $election->candidates()->attach($candidate->pluck('id'));
        }

        $data = [
            'voter_id' => $user->id,
            'election_id' => $elections->random()->id,
            'candidate_id' => rand(0, 1) ? $candidate->id : null,
            'is_chose_not_select' => false ?: true,
        ];

        $response = $this->post(route('election.vote.store', $elections->random()->id), $data);

        $this->actingAs($user);
        $response = $this->get(route('voterDashboard'));

        $response->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('User/Dashboard')
                ->has('usersElections.data', 3)
                ->has('votedElections.data', 1)
                ->has('unVotedElections.data', 2)
        );
    }

    public function test_admin_index()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $elections = Election::factory(3)->create([
            'admin_id' => $admin->id,
        ]);

        $response = $this->get(route('admin.dashboard'));

        $response->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Dashboard')
                ->has('elections.data', 3)
        );
    }
}
