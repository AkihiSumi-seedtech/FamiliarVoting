<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Admin;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardControllerTest extends TestCase
{
    use WithFaker;

    public function test_voter_index()
    {
        $admin = Admin::factory()->create();
        $user = User::factory()->create();
        $candidates = Candidate::factory(3)->create();

        // Create elections
        $elections = Election::factory(3)->create([
            'status' => 'Running',
            'admin_id' => $admin->id
        ]);

        // Attach elections to the user
        $user->elections()->attach($elections->pluck('id')->toArray());
        // Attach elections to candidate
        foreach ($elections as $election) {
            $election->candidates()->attach($candidates->pluck('id')->toArray());
        }

        $data = [
            'voter_id' => $user->id,
            'election_id' => $election->id,
            'candidate_id' => rand(0, 1) ? $candidates->random()->id : null,
        ];
        $data['is_chose_not_select'] = is_null($data['candidate_id']) ? true : false;

        $response = $this->post(route('election.vote.store', $election->id), $data);

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
