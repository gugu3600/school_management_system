<?php 

namespace App\Repositories\Enrollment;

interface EnrollmentRepositoryInterface
{
     public function index();
     public function store($userId,$classroomId);
}