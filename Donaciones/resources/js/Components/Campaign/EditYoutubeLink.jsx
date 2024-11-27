import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditYoutubeLink = ({ campaign }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [youtubePreview, setYoutubePreview] = useState(
    campaign.youtube_link || ""
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      youtube_link: campaign.youtube_link || "",
    },
  });
  const youtubeLink = watch("youtube_link");
  const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const onSubmit = async (data) => {
    try {
      await axios.put("/update_youtube/" + campaign.id, data);
      toast.success("¡Video actualizado con éxito!");
    } catch (error) {
      toast.error("Error al actualizar el video.");
    }
  };

  // Update the preview when the link changes
  React.useEffect(() => {
    const videoId = getYouTubeVideoId(youtubeLink);
    if (videoId) {
      setYoutubePreview(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setYoutubePreview("");
    }
  }, [youtubeLink]);

  return (
    <div className="container mt-4" style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <ToastContainer />
      {/* Botón para mostrar/ocultar el panel */}
      <button
      
        className=" btn btn-secondary mb-4"
        onClick={() => setIsPanelOpen(!isPanelOpen)}
      >
        {isPanelOpen ? "Cerrar Editor de Video" : "Video"}
      </button>
      {isPanelOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <ToastContainer />
          <div className="form-group">
            <h3 className="text-center mb-4"> Enlace de YouTube </h3>
            <label htmlFor="youtube_link">
              Si no quieres ningun video solo guarda el cambio sin link
            </label>
            <input
              id="youtube_link"
              type="url"
              className={`form-control ${
                errors.youtube_link ? "is-invalid" : ""
              }`}
              {...register("youtube_link", {
                required: false,
                pattern: {
                  value: /^https?:\/\/(www\.)?youtube\.com\/.+$/,
                  message: "Debe ser un enlace válido de YouTube.",
                },
              })}
            />
            {errors.youtube_link && (
              <div className="invalid-feedback">
                {errors.youtube_link.message}
              </div>
            )}
          </div>

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

          <button type="submit" className="btn btn-primary mt-3">
            Guardar cambios
          </button>
        </form>
      )}
    </div>
  );
};

export default EditYoutubeLink;
