<?php

namespace Tests\Feature\Http\Controllers\Admin;

use App\Http\Requests\Admin\StoreElectionRequest;
use App\Http\Requests\Admin\UpdateElectionRequest;
use App\Models\Admin;
use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ElectionControllerTest extends TestCase
{
    use WithFaker;

    public function test_create()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $response = $this->get(route('admin.election.create'));

        $response->assertStatus(200);

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/election/CreateElection')
        );
    }

    public function test_store()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $data = [
            'election_name' => 'テスト用選挙',
            'start_date' => $this->faker->dateTimeBetween('now', '+1 week')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('+2 week', '+1 months')->format('Y-m-d'),
            'status' => '',
            'description' => '',
            'admin_id' => $admin->id,
        ];

        $request = new StoreElectionRequest($data);

        $response = $this->post(route('admin.election.store'), $request->toArray());

        $response->assertStatus(302);

        $response->assertRedirect(route('admin.dashboard'));

        $this->assertDatabaseHas('elections', ['status' => 'Building']);
    }

    public function test_show_authorized()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create(['admin_id' => $admin->id]);

        $response = $this->get(route('admin.election.show', $election->id));
        $response->assertStatus(200);

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Overview/index')
            ->has('election', 9)
        );
    }

    public function test_show_unauthorized()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        // 別の管理者によって作成された選挙を作成
        $otherAdmin = Admin::factory()->create();
        $election = Election::factory()->create(['admin_id' => $otherAdmin->id]);

        // show アクションに GET リクエストを送信
        $response = $this->get(route('admin.election.show', $election->id));

        // レスポンスが 403 ステータスコードであることを確認
        $response->assertStatus(403);
    }

    public function test_launch_election()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create([
            'admin_id' => $admin->id,
            'status' => 'Building',
        ]);


        $response = $this->post(route('admin.launch-election', $election->id));
        $response->assertStatus(302);

        $response->assertRedirect(route('admin.dashboard'));

        $this->assertDatabaseHas('elections', ['status' => 'Scheduling']);
    }

    public function test_update()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create([
            'admin_id' => $admin->id,
        ]);

        $description = [
            'description' => 'テストです。'
        ];

        $request = new UpdateElectionRequest($description);

        $response = $this->put(route('admin.election.update', $election->id), $request->toArray());
        $response->assertStatus(200);

        $this->assertDatabaseHas('elections', ['description' => 'テストです。']);
    }

    public function test_destroy()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create([
            'admin_id' => $admin->id,
        ]);

        $users = User::factory(5)->create();
        $election->users()->attach($users->pluck('id')->toArray());

        $candidates = Candidate::factory(3)->create();
        $election->candidates()->attach($candidates->pluck('id')->toArray());

        $response = $this->delete(route('admin.election.destroy', $election->id));
        $response->assertStatus(302);

        $response->assertRedirect(route('admin.dashboard'));

        $response->assertSessionHas('success', '選挙が削除されました。');

        $this->assertDatabaseMissing('elections', ['id' => $election->id]);
        $this->assertDatabaseMissing('election_user', ['election_id' => $election->id]);
        $this->assertDatabaseMissing('candidate_election', ['election_id' => $election->id]);
    }

    public function test_update_election_status_to_running()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create([
            'status' => 'Scheduling',
            'start_date' => Carbon::parse($this->faker->dateTimeBetween('now')),
            'end_date' => Carbon::parse($this->faker->dateTimeBetween('+2 week', '+1 months')),
            'admin_id' => $admin->id,
        ]);

        // dd($election->start_date);
        $response = $this->post(route('admin.update-election-status', $election->id));
        $response->assertStatus(200);

        $this->assertDatabaseHas('elections', ['status' => 'Running']);
    }

    public function test_update_election_status_to_closed()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create([
            'status' => 'Running',
            'start_date' => Carbon::parse($this->faker->dateTimeBetween('-1 week')),
            'end_date' => Carbon::parse($this->faker->dateTimeBetween('-1 hour', 'now')),
            'admin_id' => $admin->id,
        ]);

        $response = $this->post(route('admin.update-election-status', $election->id));
        $response->assertStatus(200);

        $this->assertDatabaseHas('elections', ['status' => 'Closed']);
    }
}
