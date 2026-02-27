<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'is_active' => $this->is_active,
            'roles' => $this->roles->pluck('name'),
            "photo" => $this->photo ? $this->photo->path : null,
        ];

        if ($this->hasRole('student') && $this->student) {
            $data = [
                ...$data,
                'student_id' => $this->student->student_id,
                'dob' => $this->student->dob,
                'gender' => $this->student->gender,
                'father_name' => $this->student->father_name,
                'mother_name' => $this->student->mother_name,
                'address' => $this->student->address,
                'phone' => $this->student->phone,
                'previous_school' => $this->student->previous_school,
            ];
        }

        if($this->hasRole("teacher") && $this->teacher){
            $data = [
                ...$data,
                "employee_id" => $this->teacher->employee_id,
                "qualification" => $this->teacher->qualification,
                "joining_date" => $this->teacher->joining_date,
            ];
        }

        return $data;
    }
}
