<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    protected $fillable = [
        'student_id',
        'dob',
        'gender',
        'father_name',
        'mother_name',
        'address',
        'phone',
        'previous_school',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function photo()
    {

        return $this->hasOneThrough(
            Photo::class,
            User::class,
            "id", // User id from student table which is connected with user_id
            "user_id", // user_id from photo table
            "user_id", // user_id from student table
            "id" // local key of User table
        );
    }
}
