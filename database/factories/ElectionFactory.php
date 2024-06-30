<?php

namespace Database\Factories;

use App\Models\Election;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ElectionFactory extends Factory
{
    protected $model = Election::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'name' => $this->faker->unique()->word,
            'description' => $this->faker->paragraph,
            'startDate' => $this->faker->date(),
            'endDate' => $this->faker->date(),
            'startTime' => $this->faker->time(),
            'endTime' => $this->faker->time(),
            'location' => $this->faker->address,
            'type' => $this->faker->randomElement(['semi-online', 'online']),
            // 'password' => $this->faker->password,
        ];
    }
}
