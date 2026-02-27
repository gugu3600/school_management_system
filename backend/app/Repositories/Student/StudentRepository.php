<?php 

namespace App\Repositories\Student;

use App\Models\Student;
use App\Repositories\Student\StudentRepositoryInterface;

class StudentRepository implements StudentRepositoryInterface 
{
     public function index()
     {
          $students = Student::with("user")->get();
          return $students;
     }

     public function store($user,$data,$path = null)
     {    

          $user->assignRole("student");
          
          $students = $user->student()->create([
            "student_id" => $data["student_id"],
            "dob" => $data["dob"],
            "gender" => $data["gender"],
            "father_name" => $data["father_name"],
            "mother_name" => $data["mother_name"],
            "address" => $data["address"],
            "phone" => $data["phone"],
            "previous_school" => $data["previous_school"],
        ]);

        if($path){
          $user->photo()->create(["path" => $path]);      
          }
          
          $students->load(["user","photo"]);
                   // return Student::create($data);
          return $students;
     }


     public function show($userId)
     {
          $student = Student::with("users")->where("user_id",$userId)->firstOrFail();

          return $student;
     }

     public function update($data,$userId)
     {
          $student = Student::where("user_id",$userId)->firstOrFail();
          
           $student->update($data);

           $student->load("user");

           return $student;
     }


     public function totalStudents()
     {
          return Student::count();

     }
}