<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'voter_id' => 'required|exists:users,id',
            'election_id' => 'required|exists:elections,id',
            'candidate_id' => 'nullable|exists:candidates,id',
            'is_chose_not_select' => 'required|boolean',
        ];
    }
}
