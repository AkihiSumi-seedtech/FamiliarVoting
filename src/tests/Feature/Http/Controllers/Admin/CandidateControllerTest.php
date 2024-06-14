<?php

namespace Tests\Feature\Http\Controllers\Admin;

use App\Http\Requests\Admin\UpdateCandidateRequest;
use App\Models\Admin;
use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CandidateControllerTest extends TestCase
{
    use WithFaker;

    public function test_index(): void
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create(['admin_id' => $admin->id]);
        $candidates = Candidate::factory(5)->create();
        $election->candidates()->attach($candidates->pluck('id')->toArray());

        $response = $this->get(route('admin.election.candidates.index', $election->id));
        $response->assertStatus(200);

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Candidates/index')
            ->has('candidates.data', 5)
        );
    }

    public function test_store()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create(['admin_id' => $admin->id]);

        // Simulate the CSV file upload
        Storage::fake('local');
        $file = UploadedFile::fake()->createWithContent(
            'candidates.csv',
            "candidate_name,candidate_party,candidate_manifest\nJohn Doe,Party A,Manifesto A\nJane Smith,Party B,Manifesto B"
        );

        // Send a post request to the store route
        $response = $this->post(route('admin.election.candidates.store', $election->id), [
            'file' => $file
        ]);

        $response->assertStatus(302);

        $response->assertRedirect(route('admin.election.candidates.index', $election->id));
        $response->assertSessionHas('success', '立候補者のインポートに成功しました！');

        // Additional assertions to check if the candidates were correctly synced
        $this->assertDatabaseHas('candidates', ['candidate_name' => 'John Doe']);
        $this->assertDatabaseHas('candidates', ['candidate_party' => 'Party A']);
        $this->assertDatabaseHas('candidates', ['candidate_manifest' => 'Manifesto A']);
        $this->assertDatabaseHas('candidates', ['candidate_name' => 'Jane Smith']);
    }

    public function test_update()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $candidate = Candidate::factory()->create();

        $data = [
            'candidate_name' => 'John Doe',
            'candidate_party' => 'Party A',
        ];

        $request = new UpdateCandidateRequest($data);

        $response = $this->put(route('admin.candidates.update', $candidate->id), $request->toArray());
        $response->assertStatus(200);

        $this->assertDatabaseHas('candidates', ['candidate_name' => 'John Doe']);
        $this->assertDatabaseHas('candidates', ['candidate_party' => 'Party A']);
    }

    public function test_destroy()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create(['admin_id' => $admin->id]);
        $candidates = Candidate::factory(2)->create();
        $election->candidates()->attach($candidates->pluck('id')->toArray());
    }
}
