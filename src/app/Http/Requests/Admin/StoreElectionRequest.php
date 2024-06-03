<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreElectionRequest extends FormRequest
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
            'status' => ['string', Rule::in(['Building', 'Scheduling', 'Running', 'Closed'])],
            'description' => ['nullable', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'start_date.required' => '開始日時を入力してください。',
            'start_date.after_or_equal' => '開始日時は現在日時以降にしてください。',
            'end_date.required' => '終了日時を入力してください。',
            'end_date.after_or_equal' => '終了日時は開始日時より後にしてください。',
        ];
    }

    public function validationData()
    {
        $data = parent::validationData();

        // もし status が空ならば、デフォルト値として 'Building' を設定する
        if (!isset($data['status'])) {
            $data['status'] = 'Building';
        }

        return $data;
    }
}
