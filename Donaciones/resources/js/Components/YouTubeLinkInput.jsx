import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const YouTubeLinkInput = ({ register, errors, setVideoLink }) => {
  const [isValidLink, setIsValidLink] = useState(true);

  const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleLinkChange = (e) => {
    const link = e.target.value;
    if (link === '' || validateYouTubeUrl(link)) {
      // Si el enlace está vacío o es válido, es aceptable
      setIsValidLink(true);
      setVideoLink(link);
    } else {
      setIsValidLink(false);
    }
  };

  return (
    <Form.Group controlId="youtubeLink">
      <Form.Label>Link del video de YouTube:</Form.Label>
      <Form.Control
        type="text"
        {...register('video', {
          pattern: {
            value: /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
            message: 'Por favor ingresa un enlace de YouTube válido',
          },
        })}
        onChange={handleLinkChange}
        isInvalid={!isValidLink || !!errors.video}
        placeholder="https://www.youtube.com/..."
      />
      <Form.Control.Feedback type="invalid">
      {errors.video?.message}
      </Form.Control.Feedback>
      {!isValidLink && e.target.value !== '' && (
  <div className="text-danger">Enlace de YouTube no válido</div>
)}
    </Form.Group>
  );
};

export default YouTubeLinkInput;
