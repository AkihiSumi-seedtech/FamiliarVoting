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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Mockery;
use Tests\TestCase;



class VoterControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_index_with_search()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $election = Election::factory()->create();

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

    public function testStoreSuccessfullyImport()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');
    
        $election = Election::factory()->create();
        
        Storage::fake('local');
        $file = UploadedFile::fake()->createWithContent('import.csv', 'name,email,password,' . PHP_EOL . 'John Doe,john@example.com,johnpass');

    
        // Hit the store route with the mock file
        $response = $this->post(route('admin.election.voters.store', $election->id), [
            'file' => $file,
        ]);
        $response->assertStatus(302);

        // $this->assertDatabaseHas('users', ['name'=> 'John Doe']);
        $response->assertRedirect(route('admin.election.voters.index', $election->id))
            ->assertSessionHas('success', '投票者のインポートに成功しました！');
    
        // Assert that the users were synced with the election
        $this->assertEquals(1, $election->fresh()->users->count());
        $this->assertEquals('John Doe', $election->fresh()->users->first()->name);
        $this->assertEquals('john@example.com', $election->fresh()->users->first()->email);
        
    }

}


    // public function testStoreFailedImport()
    // {
    //     Storage::fake('local');

    //     $election = Election::factory()->create();

    //     $file = UploadedFile::fake()->createWithContent('import.csv', 'invalid,content');

    //     $errors = [
    //         'row' => 2,
    //         'attribute' => 'email',
    //         'errors' => ['The email field is required.']
    //     ];
        

    //     Excel::fake();
    //     Excel::shouldReceive('import')->andThrow(new \Maatwebsite\Excel\Validators\ValidationException([$errors]));

    //     $response = $this->post(route('admin.election.voters.store', $election->id), [
    //         'file' => $file,
    //     ]);


    //     $response->assertStatus(302)
    //              ->assertRedirect(route('admin.election.voters.index', ['election' => $election->id]))
    //              ->assertSessionHas('error', 'インポート中にエラーが発生しました。');

    //     // Assert that the database state remains unchanged
    //     $this->assertEquals(0, DB::table('election_user')->count());
    // }
