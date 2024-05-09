<?php

namespace Database\Factories;

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
        return [
            'name' => fake()->sentence(),
            'start_date' => fake()->dateTime('now'),
            'end_date' => fake()->dateTime('now', '+1 year'),
            'status' => fake()->randomElement(['building', 'scheduling', 'running']),
            'description' => fake()->realText(),
            'created_by' => 1,
            'updated_by' => 1,
            'created_by' => time(),
            'updated_by' => time(),
        ];
    }
}
