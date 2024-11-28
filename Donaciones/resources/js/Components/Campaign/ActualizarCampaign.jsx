import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Inertia } from "@inertiajs/inertia";
import ImageUpload from "@/Components/ImageUpload";

const ActualizarCampaign = ({ campaign }) => {
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmitNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("note", note);

    imageFiles.forEach((file) => {
      formData.append("images[]", file);
    });

    try {
      // Enviar datos al backend
      await axios.post(`/campaigns/${campaign.id}/notes`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Actualización exitosa");
      setNote("");
      setImageFiles([]);
      handleCloseModal();
      Inertia.visit(`/campaigns/${campaign.id}`);

    } catch (error) {
      console.error("Error al actualizar", error);
      toast.error("Error al actualizar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleShowModal}
        className="flex justify-center items-center h-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold py-1 px-2 rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
      >
        Actualizar campaña
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar campaña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitNote}>
            <Form.Group controlId="formNote">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Escriba lo que ha pasado recientemente en su campaña"
                required
              />
            </Form.Group>
            <ImageUpload setImageFiles={setImageFiles} errors={{}} />
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className="mt-3"
            >
              {isSubmitting ? "Actualizando..." : "Actualizar"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ActualizarCampaign;
