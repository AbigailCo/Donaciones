import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';



const ImageUpload = ({ register, errors, setImageFiles }) => {
  const [imageFiles, setImageFilesState] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageToRemove, setImageToRemove] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Actualiza el estado de imageFiles
    setImageFilesState((prev) => [...prev, ...files]);
    setImageFiles((prev) => [...prev, ...files]); // Actualiza el estado de archivos en el componente padre

    useEffect(() => {
      console.log('Estado de imageFiles después de agregar:', imageFiles);
    }, [imageFiles]);
  };

  const handleAddMoreImages = () => {
    const newInput = document.createElement('input');
    newInput.type = 'file';
    newInput.accept = 'image/*';
    newInput.multiple = true;
    newInput.onchange = handleImageChange;
    newInput.click();
  };

  const handleRemoveImage = () => {
    setImageFilesState((prev) => {
      const updatedFiles = prev.filter((file, index) => index !== imageToRemove);
      console.log('Archivos de imagen después de eliminar:', updatedFiles); // Verifica los archivos después de eliminar
      return updatedFiles;
    });
    setImageFiles((prev) => prev.filter((_, index) => index !== imageToRemove)); // Actualiza el estado en el componente padre
    setShowModal(false);
  };

  const openModal = (index) => {
    setImageToRemove(index);
    setShowModal(true);
  };

  console.log('Estado de imageFiles:', imageFiles);
  
  return (
    <div>
      <Form.Label>Subir Imágenes:</Form.Label>
      <Button variant="secondary" onClick={handleAddMoreImages}>
        + Imágenes
      </Button>

      <div className="mt-2">
        {imageFiles.map((file, index) => (
          <div key={index} className="me-2 position-relative" style={{ display: 'inline-block' }}>
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <Button
              variant="danger"
              size="sm"
              style={{ position: 'absolute', top: '0', right: '0' }}
              onClick={() => openModal(index)}
            >
              X
            </Button>
          </div>
        ))}
      </div>

      {errors.images && <div className="text-danger">{errors.images.message}</div>}

      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta imagen?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleRemoveImage}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageUpload;
