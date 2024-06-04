<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CandidateResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'candidate_name' => $this->candidate_name,
            'candidate_party' => $this->candidate_party,
            'candidate_manifest' => $this->candidate_manifest,
            'election_id' => $this->election_id,
        ];
    }
}
