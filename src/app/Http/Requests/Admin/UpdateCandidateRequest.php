<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCandidateRequest extends FormRequest
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
        $candidate = $this->route('candidate');
        return [
            "candidate_name" => ['required', 'string'],
            "candidate_party" => ['required', 'string'],
            // 'candidate_manifest' => ['required', 'text'],
        ];
    }
}
