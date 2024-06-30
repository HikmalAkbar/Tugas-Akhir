<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voter;
use App\Http\Requests\StoreVoterRequest;
use App\Http\Requests\UpdateVoterRequest;
use App\Http\Resources\VoterResource;

class VoterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return VoterResource::collection(Voter::query()->orderBy('id', 'asc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreVoterRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVoterRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $voter = Voter::create($data);

        return response(new VoterResource($voter) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Voter $voter
     * @return \Illuminate\Http\Response
     */
    public function show(Voter $voter)
    {
        return new VoterResource($voter);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateVoterRequest $request
     * @param \App\Models\Voter                     $voter
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVoterRequest $request, Voter $voter)
    {
        $this->authorize('update', $voter);

        $data = $request->validated();
        // if (isset($data['password'])) {
        //     $data['password'] = bcrypt($data['password']);
        // }
        $voter->update($data);

        return new VoterResource($voter);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Voter $voter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Voter $voter)
    {
        $this->authorize('delete', $voter);

        $voter->delete();

        return response("", 204);
    }

    public function count()
    {
        $count = Voter::count();
        return response()->json(['count' => $count]);
    }
}
