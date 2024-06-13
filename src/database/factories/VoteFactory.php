<?php

namespace Database\Factories;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vote>
 */
class VoteFactory extends Factory
{
    protected $model = Vote::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'voter_id' => User::factory(),
            'election_id' => Election::factory(),
            'candidate_id' => Candidate::factory() ?: null,
            'is_chose_not_select' => false ?: true,
        ];
    }
}
