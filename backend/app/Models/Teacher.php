<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        "employee_id",
        "qualification",
        "joining_date",
        "user_id"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function photo()
    {
        return $this->hasOneThrough(
            Photo::class,
            User::class,
            "id",
            "user_id",
            "user_id",
            "id"
        );
    }
}
