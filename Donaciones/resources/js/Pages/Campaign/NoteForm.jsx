import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import ImageUpload from './ImageUpload'; // Componente reutilizado

const NoteForm = ({ campaignId }) => {
  const [note, setNote] = useState('');
  const [imageFiles, setImageFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('note', note);
    imageFiles.forEach((file) => {
      formData.append('images[]', file);
    });

    try {
      const response = await axios.post(`/api/campaigns/${campaignId}/notes`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Nota creada exitosamente:', response.data);
      // Limpiar formulario después de enviar
      setNote('');
      setImageFiles([]);
    } catch (error) {
      console.error('Error al crear la nota:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Nota</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
      </Form.Group>

      <ImageUpload setImageFiles={setImageFiles} errors={{}} />

      <Button variant="primary" type="submit">
        Guardar Nota
      </Button>
    </Form>
  );
};

export default NoteForm;
