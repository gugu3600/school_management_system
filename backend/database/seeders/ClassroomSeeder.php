<?php

namespace Database\Seeders;

use App\Models\Classroom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $i = 0 ;
        $classes = [];

        
        for($i = 0 ; $i < 12 ; $i++ ){
            $classes[] = [
                "name" => "Grade".$i+1,
                "created_at" => now(),
                "updated_at" => now(),
            ];
        }

        Classroom::create([
            "name" => "Kindergarten"
        ]);

        Classroom::insert($classes);

    }
}
