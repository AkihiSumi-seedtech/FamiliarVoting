<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidate_name',
        'candidate_party',
        'election_id',
    ];

    public function electionId()
    {
        return $this->belongsTo(Election::class, 'election_id');
    }
}
