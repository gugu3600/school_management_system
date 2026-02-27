<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\Academic_Year\Academic_Year_RepositoryInterface;
use Illuminate\Http\Request;

class Academic_Year_Controller extends BaseController
{
    protected $academic_year_repo;

    public function __construct(Academic_Year_RepositoryInterface $academic_year_repo)
    {
        $this->academic_year_repo = $academic_year_repo;
    }

    public function getCurrentYear()
    {
        $currenYear = $this->academic_year_repo->currentYear();

        return $this->success($currenYear,"Current Year Retrived Successfully",200);
    }
}
