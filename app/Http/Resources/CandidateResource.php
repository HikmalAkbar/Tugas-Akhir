<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CandidateResource extends JsonResource
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
            'name' => $this->name,
            'party' => $this->party,
            'bio' => $this->bio,
            'user_id' => $this->user_id,
            'election_id' => $this->election_id,
            // 'users' => UserResource::collection($this->users),
            // 'elections' => ElectionResource::collection($this->elections),
            // 'votes' => VoteResource::collection($this->votes),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
