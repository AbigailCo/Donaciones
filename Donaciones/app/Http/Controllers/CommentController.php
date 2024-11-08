<?php
namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Guardar un nuevo comentario
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'comment' => 'required|string',
        'campaign_id' => 'required|exists:campaigns,id',
    ]);

    $comment = Comment::create([
        'comment' => $validatedData['comment'],
        'campaign_id' => $validatedData['campaign_id'],
        'user_id' => auth()->id(), // Asegura que se asigne el usuario actual
    ]);

    // Recarga la relación con el usuario
    $comment->load('user');

    return response()->json($comment);
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