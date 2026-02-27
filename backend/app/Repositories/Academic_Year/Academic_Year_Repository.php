<?php 

namespace App\Repositories\Academic_Year;

use App\Models\Academic_Year;
use App\Repositories\Academic_Year\Academic_Year_RepositoryInterface;

class Academic_Year_Repository implements Academic_Year_RepositoryInterface
{
     public function currentYear()
     {
          return Academic_Year::where("is_current",true)->value("name");
     }
}