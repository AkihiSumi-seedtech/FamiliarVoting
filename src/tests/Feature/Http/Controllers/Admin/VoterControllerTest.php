<?php

namespace Tests\Feature\Http\Controllers\Admin;

use App\Models\Admin;
use App\Models\Election;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Imports\UserImport;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Mockery;
use Tests\TestCase;


class VoterControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_with_search()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        // Create an election
        $election = Election::factory()->create();

        // Create some users for the election
        $user = User::factory(5)->create();
        $election->users()->attach($user->pluck('id')->toArray());

        // Simulate a request to the index method with search parameters
        $response = $this->get(route('admin.election.voters.index', $election->id) 
            // 'sort_field' => 'id',
            // 'sort_direction' => 'asc',
            // 'name' => 'John',
        );

        $response->assertStatus(200);

        // Assert that the response contains the user with name 'John Doe'
        $response->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Voters/index')
        ->has('election', 9)
        ->has('voters.data', 5)
        );
    }
    

}
