<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidate_name',
        'candidate_party',
        'candidate_manifest',
    ];

    public function elections(): BelongsToMany
    {
        return $this->belongsToMany(
            Election::class,
            'candidate_election',
            'candidate_id',
            'election_id'
        )->withTimestamps();
    }
}
