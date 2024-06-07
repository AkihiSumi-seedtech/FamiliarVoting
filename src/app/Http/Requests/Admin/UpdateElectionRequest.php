<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateElectionRequest extends FormRequest
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
            'election_name' => ['required', 'max:50'],
            'start_date' => 'required|date|after_or_equal:now',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'string',
            'description' => ['nullable', 'text'],
        ];
    }
}
