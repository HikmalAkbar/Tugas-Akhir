<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Election;
use Illuminate\Http\Request;
use App\Http\Resources\ElectionResource;

class HomePageController extends Controller
{
    /**
     * Get online elections.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getOnlineElections(Request $request)
    {
        $limit = $request->query('limit', 5);
        $elections = Election::where('type', 'online')
            ->orderBy('id', 'asc')
            ->limit($limit)
            ->get();

        return ElectionResource::collection($elections);
    }

    /**
     * Get semi-online elections.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getSemiOnlineElections(Request $request)
    {
        $limit = $request->query('limit', 5);
        $elections = Election::where('type', 'semi-online')
            ->orderBy('id', 'asc')
            ->limit($limit)
            ->get();

        return ElectionResource::collection($elections);
    }

    public function showElection($id)
    {
        $election = Election::with('candidates')->findOrFail($id);
        return response()->json($election);
    }

    public function vote(Request $request)
    {
        $request->validate(['candidate_id' => 'required|exists:candidates,id']);
        $vote = Vote::create([
            'user_id' => $request->user()->id,
            'candidate_id' => $request->candidate_id
        ]);
        return response()->json(['message' => 'Vote submitted successfully'], 200);
    }
}
