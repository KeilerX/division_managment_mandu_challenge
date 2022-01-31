<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Division;

class DivisionTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testGetDivision()
    {
        $division = Division::factory()->create();
        $response = $this->json('GET', '/api/division');
        $response->assertStatus(200)
                 ->assertJsonStructure([
                    'id', 'superior_division_id', 'name', 'level', 'collaborators', 'ambassador_name', 'subdivisions'
                 ]);
    }
}
