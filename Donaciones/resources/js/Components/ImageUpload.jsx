import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';

const ImageUpload = ({ register, errors }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div>
      <Form.Label>Imagen:</Form.Label>
      <Form.Control
        type="file"
        {...register('image')}
        onChange={handleImageChange}
      />
      {errors.image && (
        <Form.Control.Feedback type="invalid">
          {'Imagen es requerida'}
        </Form.Control.Feedback>
      )}
      {imagePreview && (
        <div className="mt-3">
          <Image src={imagePreview} alt="Vista previa" fluid />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
