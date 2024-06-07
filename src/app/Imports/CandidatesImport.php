<?php

namespace App\Imports;

use App\Models\Candidate;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\PersistRelations;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class CandidatesImport implements ToCollection, PersistRelations, WithHeadingRow
{
    use Importable;

    private $electionId;
    private $importedCandidateIds = [];

    public function __construct($electionId)
    {
        $this->electionId = $electionId;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row)
        {
            $candidate = Candidate::create([
                'candidate_name' => $row['candidate_name'],
                'candidate_party' => $row['candidate_party'],
                'candidate_manifest' => $row['candidate_manifest'],
            ]);

            $this->importedCandidateIds[] = $candidate->id;
        }
    }

    public function getImportedCandidateIds()
    {
        return $this->importedCandidateIds;
    }
}
