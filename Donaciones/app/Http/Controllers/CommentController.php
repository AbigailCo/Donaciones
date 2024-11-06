<?php
namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Guardar un nuevo comentario
    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|string|max:500',
            'campaign_id' => 'required|exists:campaigns,id',
        ]);

        $comment = Comment::create([
            'comment' => $request->comment,
            'user_id' => auth()->id(),
            'campaign_id' => $request->campaign_id,
        ]);

        return response()->json($comment, 201);
    }

    // Obtener los comentarios de una campaña
    public function index($campaign_id)
    {
        $comments = Comment::where('campaign_id', $campaign_id)
                           ->with('user')
                           ->latest()
                           ->get();
        return response()->json($comments);
    }
}