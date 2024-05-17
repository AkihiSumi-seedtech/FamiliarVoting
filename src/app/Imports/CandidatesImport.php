<?php

namespace App\Imports;

use App\Models\Candidate;
use App\Models\Election;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;

class CandidatesImport implements ToModel
{
    private $election_id;

    public function __construct($election_id)
    {
        $this->election_id = $election_id;
    }
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Candidate([
            'candidate_name' => $row[0],
            'candidate_party' => $row[1],
            'election_id' => $this->election_id,
        ]);
        // foreach ($rows as $row)
        // {
        //     if($row->filter()->isNotEmpty()){

        //         Candidate::create([
        //             'candidate_name' => $row[0],
        //             'candidate_party' => $row[1],
        //             'election_id' => $this->election[$row[2]],
        //         ]);
        //     }
        // }
    }
}
