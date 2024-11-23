import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditImagesCampaign = ({ campaignId }) => {
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`/campaigns/${campaignId}/images`);
        setImages(response.data);
      } catch (error) {
        console.error("Error al obtener las imágenes", error);
      }
    };
    fetchImages();
  }, [campaignId]);

  // Manejar el cambio de archivos (para agregar nuevas imágenes)
  const handleFileChange = (e) => {
    setNewImages([...e.target.files]);
  };

  // Subir nuevas imágenes
  const handleUpload = async (e) => {
    e.preventDefault();
    if (newImages.length === 0) return;

    const formData = new FormData();
    newImages.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    try {
      const response = await axios.post(
        `/campaigns/${campaignId}/images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImages([...images, ...response.data.images]);
      toast.success("Imagen subida con exito");
    } catch (error) {
        toast.error("error al subir la imagen");
      console.error(error);
    }
  };

  // Eliminar una imagen
  const handleDelete = async (imageId) => {
    try {
      await axios.delete(`/images_campaign/${imageId}`);
      setImages(images.filter((image) => image.id !== imageId));
      toast.success("Imagen eliminada con exito");
    } catch (error) {
        toast.error("error al eliminar la imagen");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Imágenes de la Campaña</h3>
      <ToastContainer />
      {/* Mostrar las imágenes existentes */}
      <div className="row">
        {images.length > 0 ? (
          images.map((image) => (
            <div
              key={image.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 text-center"
            >
              <div className="card">
                <img
                  src={`/storage/images/${image.path}`}
                  alt="Campaign"
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(image.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">
            No hay imágenes para esta campaña.
          </p>
        )}
      </div>

      <form onSubmit={handleUpload} className="mt-4">
        <div className="mb-3">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Subir Imágenes
        </button>
      </form>
    </div>
  );
};

export default EditImagesCampaign;
