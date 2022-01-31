<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DivisionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'superior_division_id' => $this->faker->randomDigitNotNull,
            'collaborators' => $this->faker->numberBetween($min = 1, $max = 20),
            'level' => $this->faker->numberBetween($min = 1, $max = 10),
            'subdivisions' => $this->faker->numberBetween($min = 0, $max = 10),
            'ambassador_name' => $this->faker->name(),
        ];
    }
}
