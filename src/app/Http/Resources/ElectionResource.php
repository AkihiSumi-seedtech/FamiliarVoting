<?php

namespace App\Http\Resources;

use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ElectionResource extends JsonResource
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
            'election_name' => $this->election_name,
            'start_date' => (new Carbon($this->start_date))->format('Y-m-d'),
            'end_date' => (new Carbon($this->end_date))->format('Y-m-d'),
            'status' => $this->status,
            'description' => $this->description,
            'admin_id' => Auth::id(),
        ];
    }
}
