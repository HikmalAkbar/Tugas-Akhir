<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VoterResource extends JsonResource
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
            'nik' => $this->nik,
            'address' => $this->address,
            'token' => $this->token,
            'is_used' => $this->is_used,
            'user_id' => $this->user_id,
            // 'users' => UserResource::collection($this->users),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
