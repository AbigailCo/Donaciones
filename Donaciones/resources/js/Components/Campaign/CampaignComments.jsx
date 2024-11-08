import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

const CampaignComments = ({ campaign, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
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
      setComments([{ ...response.data, user: currentUser }, ...comments]);
      setNewComment('');
    })
    .catch(error => console.error(error));
  };

  return (
    <Card sx={{ marginTop: 3, padding: 2, boxShadow: 3 }}>
      <Typography variant="h5" gutterBottom>Comentarios</Typography>
      
      <Box sx={{ maxHeight: '300px', overflowY: 'auto', marginBottom: 2 }}>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} sx={{ marginBottom: 1.5, padding: 1.5 }}>
              <Typography variant="subtitle2" color="text.primary">
                {comment.user?.name || "Usuario desconocido"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {comment.comment}
              </Typography>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No hay comentarios aún.</Typography>
        )}
      </Box>

      <form onSubmit={handleCommentSubmit}>
        <TextField
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Deja tu comentario"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ marginBottom: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Comentar
        </Button>
      </form>
    </Card>
  );
};

export default CampaignComments;

