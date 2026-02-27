<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $password = Hash::make("password");
        $admin = [
            "id" => 1,
            "name" => "admin",
            "password" => $password,
            "email" => "admin@mail.co",
        ];

        $user1 = User::create($admin);
        $user1->roles()->attach(1);

        for($i = 0 ; $i < 50 ; $i++) {
$students = 
            User::create(["name" => fake()->name(),"email" => fake()->safeEmail(),"password" => $password]);

            $students->assignRole("student");

            $students->student()->create([
                'student_id'      => fake()->unique()->numberBetween(10000, 99999),
        'dob'             => fake()->date('Y-m-d', '2012-12-31'),
        'gender'          => fake()->randomElement(['male', 'female']),
        'father_name'     => 'U ' . fake()->name('male'),
        'mother_name'     => 'Daw ' . fake()->name('female'),
        'address'         => fake()->address(),
        'phone'           => fake()->phoneNumber(),
        'previous_school' => fake()->company() . " High School",
            ]);
        }

        for($i = 0; $i < 35 ; $i++){
            $teachers = 
            User::create(["name" => fake()->name(),"email" => fake()->safeEmail(),"password" => $password]);

            $teachers->assignRole("teacher");
            $teachers->teacher()->create([
                'employee_id'   => fake()->unique()->numberBetween(100, 999),
        'qualification' => fake()->randomElement(['B.C.Sc', 'B.C.Tech', 'M.C.Sc', 'PhD (CS)']),
        'joining_date'  => fake()->date('Y-m-d', 'now'),
            ]);
        }
        
            
    }
}
