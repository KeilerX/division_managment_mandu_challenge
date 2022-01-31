<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('divisions')->insert([
            ['name' => 'Dirección General',
            'superior_division_id' => null,
            'collaborators' => 1,
            'level' => 10,
            'subdivisions' => 6,
            'ambassador_name' => 'No One',         
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")],
            ['name' => 'CEO',
            'superior_division_id' => 1,
            'collaborators' => 1,
            'level' => 1,
            'subdivisions' => 1,
            'ambassador_name' => 'Jordyn Herwitz',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")],
            ['name' => 'Mandu-Corp',
            'superior_division_id' => 1,
            'collaborators' => 11,
            'level' => 2,
            'subdivisions' => 4,
            'ambassador_name' => 'Carla Siphorn',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")],
            ['name' => 'Growth',
            'superior_division_id' => 2,
            'collaborators' => 4,
            'level' => 2,
            'subdivisions' => 3,
            'ambassador_name' => '-',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")],
            ['name' => 'Strategy',
            'superior_division_id' => 1,
            'collaborators' => 6,
            'level' => 3,
            'subdivisions' => 4,
            'ambassador_name' => '-',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")],
            ['name' => 'CEO',
            'superior_division_id' => 3,
            'collaborators' => 11,
            'level' => 3,
            'subdivisions' => 5,
            'ambassador_name' => 'Terry Press',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s")]
        ]);
    }
}
