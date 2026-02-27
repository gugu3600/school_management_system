<?php 

namespace App\Repositories\Teacher;

use App\Repositories\Teacher\TeacherRepositoryInterface;
use App\Models\Teacher;

class TeacherRepository implements TeacherRepositoryInterface
{
     public function totalTeachers()
     {
          return Teacher::count();
     }

     public function store($user,$data,$path = null)
     {
          $user->assignRole("teacher");
          $teacher = $user->teacher()->create([
               "employee_id" => $data["employee_id"],
            "qualification" => $data["qualification"],
            "joining_date" =>  $data["joining_date"],
          ]);
          
          if($path){
               $user->photo()->updateOrCreate([
                    "user_id" => $user->id,
                    "path" => $path,
               ]);
          }
          $teacher->load(["user","photo"]);
          return $teacher;
     }

     public function update($data,$userId)
     {
          $teacher = Teacher::where("user_id",$userId)->firstOrFail();

          $teacher->update($data);
          $teacher->load("user");

          return $teacher;
     }

}