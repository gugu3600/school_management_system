<?php 

namespace App\Repositories\Enrollment;

use App\Models\Academic_Year;
use App\Models\Enrollment;
use App\Repositories\Academic_Year\Academic_Year_RepositoryInterface;
use App\Repositories\Enrollment\EnrollmentRepositoryInterface;

class EnrollmentRepository implements EnrollmentRepositoryInterface
{

     public function index()
     {
          $enrollments = Enrollment::with(["user","classroom","academic_year"])->get();

          return $enrollments;
     }
     public function store($studentId,$classroomId)
     {
          $acdemic_yearId = Academic_Year::where("is_current",true)->first();

          return Enrollment::create([
               "student_id" => $studentId,
               "classroom_id" => $classroomId,
               "academic_year_id" => $acdemic_yearId
          ]);
     }
}