<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Http\Requests\StoreCandidateRequest;
use App\Http\Requests\UpdateCandidateRequest;
use App\Http\Resources\CandidateResource;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return CandidateResource::collection(Candidate::query()->orderBy('id', 'asc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreCandidateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCandidateRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $candidate = Candidate::create($data);

        return response(new CandidateResource($candidate) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Candidate $candidate
     * @return \Illuminate\Http\Response
     */
    public function show(Candidate $candidate)
    {
        return new CandidateResource($candidate);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateCandidateRequest $request
     * @param \App\Models\Candidate                     $candidate
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCandidateRequest $request, Candidate $candidate)
    {
        $this->authorize('update', $candidate);

        $data = $request->validated();
        // if (isset($data['password'])) {
        //     $data['password'] = bcrypt($data['password']);
        // }
        $candidate->update($data);

        return new CandidateResource($candidate);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Candidate $candidate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Candidate $candidate)
    {
        $this->authorize('delete', $candidate);

        $candidate->delete();

        return response("", 204);
    }

    public function count()
    {
        $count = Candidate::count();
        return response()->json(['count' => $count]);
    }
}
