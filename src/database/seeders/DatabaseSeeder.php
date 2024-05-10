<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Election;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        Admin::factory()->create([
            'id' => 1,
            'name' => 'Akihi',
            'email' => 'akih@dev.com',
            'password' => bcrypt('123.321aa'),
            'email_verified_at' => time(),
        ]);

        Election::factory()
            ->count(5)
            ->create();
    }
}
