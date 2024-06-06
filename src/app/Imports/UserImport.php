<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\PersistRelations;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UserImport implements ToCollection, PersistRelations, WithHeadingRow
{
    use Importable;

    private $electionId;
    private $importedUserIds = [];

    public function __construct($electionId)
    {
        $this->electionId = $electionId;
    }

    public function collection(Collection $rows)
    {
        foreach ($rows as $row)
        {
            $user = User::create([
                'name' => $row['name'],
                'email' => $row['email'],
                'password' => Hash::make($row['password']),
            ]);

            $this->importedUserIds[] = $user->id;
        }
    }

    public function getImportedUserIds()
    {
        return $this->importedUserIds;
    }
}
