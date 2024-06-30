<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VoteResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'election_id' => $this->election_id,
            'candidate_id' => $this->candidate_id,
            'voter_id' => $this->voter_id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
