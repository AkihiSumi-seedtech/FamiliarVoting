<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Election extends Model
{
    use HasFactory;

    protected $fillable = [
        'election_name',
        'start_date',
        'end_date',
        'status',
        'description',
        'admin_id',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'election_user', 'election_id', 'user_id')->withTimestamps();
    }

    public function candidates(): BelongsToMany
    {
        return $this->belongsToMany(Candidate::class, 'candidate_election', 'election_id', 'candidate_id')->withTimestamps();
    }

    public function votes()
    {
        return $this->hasMany(Vote::class, 'election_id');
    }
}
