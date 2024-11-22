import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
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
      <Typography variant="h5" gutterBottom>
        Actualizaciones
      </Typography>
      {notes.length > 0 ? (
        notes.map((note) => (
          <Card key={note.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  backgroundColor: "background.paper",
                  boxShadow: 2,
                  marginBottom: 3,
                }}
              >
                <Box sx={{ marginBottom: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "600",
                      color: "text.primary",
                      marginBottom: 1,
                      fontSize: "1rem",
                    }}
                  >
                    Hemos avanzado...
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.8,
                      textAlign: "justify",
                      fontSize: "1.5rem",
                    }}
                  >
                    {note.note}
                  </Typography>
                  {note.images && note.images.length > 0 ? (
                    <Carousel>
                      {note.images.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={`/storage/images/${image.path}`} // Ruta relativa
                            alt={`Imagen de la nota ${index}`}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="/storage/images/defecto.jpg" // Imagen por defecto
                        alt="Imagen por defecto"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    </Carousel.Item>
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontStyle: "italic",
                      lineHeight: 1.8,
                      textAlign: "justify",
                      fontSize: "0.95rem",
                    }}
                  >
                    <strong>Actualizada el: </strong>
                    {note.created_at_formatted}
                  </Typography>
                </Box>
              </Paper>

              {/* Si existen imágenes, se muestran en un Carousel */}
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
