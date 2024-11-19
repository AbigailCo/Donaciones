import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const CampaignNotes = ({ campaignId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Obtener las notas de la campaña desde el backend
    axios
      .get(`/campaigns/${campaignId}/notes`)
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener las notas:", error);
      });
  }, [campaignId]);

  return (
    <div>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Notas de la campaña
      </Typography>
      {notes.length > 0 ? (
        notes.map((note) => (
          <Card key={note.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="body1">{note.content}</Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Actualización: </strong> {note.note}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          No hay notas disponibles para esta campaña.
        </Typography>
      )}
    </div>
  );
};

export default CampaignNotes;
