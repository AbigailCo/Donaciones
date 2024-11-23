import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const YouTubeLinkInput = ({ register, errors, setVideoLink }) => {
  const [isValidLink, setIsValidLink] = useState(true);
  const [youtubePreview, setYoutubePreview] = useState("");

  const validateYouTubeUrl = (url) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleLinkChange = (e) => {
    const link = e.target.value;

    if (link === "" || validateYouTubeUrl(link)) {
      setIsValidLink(true);
      setVideoLink(link);

      // Extraer el ID del video y generar la URL para la previsualización
      const videoId = getYouTubeVideoId(link);
      if (videoId) {
        setYoutubePreview(`https://www.youtube.com/embed/${videoId}`);
      } else {
        setYoutubePreview("");
      }
    } else {
      setIsValidLink(false);
      setYoutubePreview("");
    }
  };

  return (
    <Form.Group controlId="youtubeLink">
      <Form.Label>Link del video de YouTube:</Form.Label>
      <Form.Control
        type="text"
        {...register("video", {
          pattern: {
            value: /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/,
            message: "Por favor ingresa un enlace de YouTube válido",
          },
        })}
        onChange={handleLinkChange}
        isInvalid={!isValidLink || !!errors.video}
        placeholder="https://www.youtube.com/..."
      />
      <Form.Control.Feedback type="invalid">
        {errors.video?.message || (!isValidLink && "Enlace de YouTube no válido")}
      </Form.Control.Feedback>

      {/* Previsualización del video */}
      {youtubePreview && (
        <div className="mt-3">
          <label>Previsualización del video</label>
          <div className="embed-responsive embed-responsive-16by9">
            <iframe
              className="embed-responsive-item"
              src={youtubePreview}
              allowFullScreen
              title="Previsualización de YouTube"
            ></iframe>
          </div>
        </div>
      )}
    </Form.Group>
  );
};

export default YouTubeLinkInput;
