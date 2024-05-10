<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Election>
 */
class ElectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startDate = $this->faker->dateTimeBetween('1 day', '+1 year');
        $endDate = Carbon::parse($startDate)->addWeek();

        return [
            'election_name' => $this->faker->sentence(),
            'start_date' => $startDate,
            'end_date' => $endDate,
            'status' => $this->faker->randomElement(['building', 'scheduling', 'running']),
            'admin_id' => 1,
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
