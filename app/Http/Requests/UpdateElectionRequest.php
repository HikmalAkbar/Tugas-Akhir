<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:500',
            'location' => 'required|string|max:255',
            'startDate' => 'required|date',
            'endDate' => 'required|date|after_or_equal:startDate',
            // Uncomment and add time validation if needed
            // 'startTime' => 'required|date_format:H:i',
            // 'endTime' => 'required|date_format:H:i|after_or_equal:startTime',
            'type' => [
                'required',
                Rule::in(['semi-online', 'online']),
            ],
            'candidates' => 'required|array',
            'candidates.*' => 'exists:candidates,id',
        ];
    }
}
