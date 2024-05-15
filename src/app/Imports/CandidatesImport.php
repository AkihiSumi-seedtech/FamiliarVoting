<?php

namespace App\Imports;

use App\Models\Candidate;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;

class CandidatesImport implements ToCollection
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function collection(Collection $rows)
    {
       foreach ($rows as $row)
       {
            Candidate::create([
                'can_name' =>$row[0],
                'can_party' =>$row[1],
            ]);
       }
    }
}
