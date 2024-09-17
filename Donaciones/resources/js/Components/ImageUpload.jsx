import React from 'react';
import { Form } from 'react-bootstrap';

const ImageUpload = ({ register, errors, setImagePreview }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form.Group controlId="imageUpload">
      <Form.Label>Subir imagen:</Form.Label>
      <Form.Control
        type="file"
        {...register('image')}
        onChange={handleImageChange}
        isInvalid={!!errors.image}
      />
      <Form.Control.Feedback type="invalid">
        {errors.image && 'Error en la carga de la imagen'}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default ImageUpload;
