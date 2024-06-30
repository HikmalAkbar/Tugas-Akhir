<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Election;
use App\Http\Requests\StoreElectionRequest;
use App\Http\Requests\UpdateElectionRequest;
use App\Http\Resources\ElectionResource;
// use Illuminate\Support\Facades\Gate;

class ElectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ElectionResource::collection(Election::query()->orderBy('id', 'asc')->paginate(15));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreElectionRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreElectionRequest $request)
    {
        // if (!Gate::allows('create-election')) {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        $this->authorize('create', Election::class);

        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        $election = Election::create($data);

        $election->candidates()->sync($data['candidates']);

        return response(new ElectionResource($election) , 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Election $election
     * @return \Illuminate\Http\Response
     */
    public function show(Election $election)
    {
        try {
            $election->load('candidates', 'votes');
            return new ElectionResource($election);
        } catch (\Exception $e) {
            \Log::error('Error loading election details: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            return response()->json(['message' => 'Error loading election details', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateElectionRequest $request
     * @param \App\Models\Election                     $election
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateElectionRequest $request, Election $election)
    {
        $this->authorize('update', $election);

        $data = $request->validated();
        $election->update($data);

        $election->candidates()->sync($data['candidates']);

        return new ElectionResource($election);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Election $election
     * @return \Illuminate\Http\Response
     */
    public function destroy(Election $election)
    {
        $this->authorize('delete', $election);

        $election->delete();

        return response("", 204);
    }

    public function count()
    {
        $count = Election::count();
        return response()->json(['count' => $count]);
    }
}
