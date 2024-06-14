<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Admin;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class VoteControllerTest extends TestCase
{
    use WithFaker;

    public function test_index()
    {
        $election = Election::factory()->create([
            'admin_id' => Admin::factory()->create()
        ]);

        $candidates = Candidate::factory(5)->create();
        $election->candidates()->attach($candidates->pluck('id'));

        $response = $this->get(route('election.vote.index', $election->id));
        $response->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('User/Voting/index')
                ->has('candidates.data', 5)
                ->has('election', 9)
        );
    }

    public function test_store()
    {
        $election = Election::factory()->create([
            'admin_id' => Admin::factory()->create()
        ]);

        $user = User::factory()->create();
        $candidate = Candidate::factory()->create();

        $election->users()->attach($user->pluck('id'));
        $election->candidates()->attach($candidate->pluck('id'));

        $data = [
            'voter_id' => $user->id,
            'election_id' => $election->id,
            'candidate_id' => $candidate->id,
            'is_chose_not_select' => false,
        ];

        $response = $this->post(route('election.vote.store', $election->id), $data);

        $response->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('User/Voting/Thanks')
        );

        $this->assertDatabaseHas('votes', $data);
    }

    public function test_show_voter_result()
    {
        $election = Election::factory()->create([
            'admin_id' => Admin::factory()->create()
        ]);

        $candidates = Candidate::factory(2)->create();
        $user = User::factory(3)->create();

        $election->candidates()->attach($candidates->pluck('id')->toArray());
        $election->users()->attach($user->pluck('id')->toArray());

        $votes = [
            [
                'voter_id' => $user[0]->id,
                'election_id' => $election->id,
                'candidate_id' => $candidates[0]->id,
                'is_chose_not_select' => false
            ],
            [
                'voter_id' => $user[1]->id,
                'election_id' => $election->id,
                'candidate_id' => null,
                'is_chose_not_select' => true
            ],
            [
                'voter_id' => $user[2]->id,
                'election_id' => $election->id,
                'candidate_id' => $candidates[1]->id,
                'is_chose_not_select' => false
            ]
        ];

        foreach ($votes as $data) {
            $response = $this->post(route('election.vote.store', $election->id), $data);
            $response->assertStatus(200);
        }

        $response = $this->get(route('showVoterResult', $election->id));

        $response->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('User/Result/index')
                ->has('result', 2)
        );
    }

    public function test_show_admin_result()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create(['admin_id' => $admin->id]);
        $candidates = Candidate::factory(2)->create();
        $user = User::factory(3)->create();

        $election->candidates()->attach($candidates->pluck('id')->toArray());
        $election->users()->attach($user->pluck('id')->toArray());

        $votes = [
            [
                'voter_id' => $user[0]->id,
                'election_id' => $election->id,
                'candidate_id' => $candidates[0]->id,
                'is_chose_not_select' => false
            ],
            [
                'voter_id' => $user[1]->id,
                'election_id' => $election->id,
                'candidate_id' => null,
                'is_chose_not_select' => true
            ],
            [
                'voter_id' => $user[2]->id,
                'election_id' => $election->id,
                'candidate_id' => $candidates[1]->id,
                'is_chose_not_select' => false
            ]
        ];

        foreach ($votes as $data) {
            $response = $this->post(route('election.vote.store', $election->id), $data);
            $response->assertStatus(200);
        }

        $response = $this->get(route('admin.election.showAdminResult', $election->id));

        $response->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Result/index')
                ->has('election', 9)
                ->has('results', 2)
                ->where('votes', 3)
        );
    }
}
