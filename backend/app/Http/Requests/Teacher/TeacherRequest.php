<?php

namespace App\Http\Requests\Teacher;

use Illuminate\Foundation\Http\FormRequest;

class TeacherRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => "string|required",
            "email" => "string|required",
            "password" => "string|required", 
            "image" => "nullable|image|file|min:100|max:5120",
            "employee_id" => "numeric|required",
            "qualification" => "string|required",
            "joining_date" => "date|required",
        ];
    }
}
