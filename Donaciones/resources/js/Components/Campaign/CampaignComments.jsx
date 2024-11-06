import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignComments = ({ campaign }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    // Cargar los comentarios de la campaña
    axios.get(`/campaigns/${campaign.id}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error(error));
  }, [campaign.id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment) return;

    axios.post('/comments', {
      comment: newComment,
      campaign_id: campaign.id,
    })
    .then(response => {
      setComments([response.data, ...comments]);
      setNewComment('');
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Comentarios</h2>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} style={{ marginBottom: '15px' }}>
              <strong>{comment.user.name}</strong>
              <p>{comment.comment}</p>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Deja tu comentario"
          required
          style={{ width: '100%', minHeight: '100px' }}
        />
        <button type="submit">Comentar</button>
      </form>
    </div>
  );
};

export default CampaignComments;