import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import ImageUpload from '@/Components/ImageUpload';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';  // Importa react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos

const CreateCampaign = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();  // Usa useNavigate para redirigir

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('goal', data.goal);
      formData.append('start_date', data.start_date);
      formData.append('end_date', data.end_date);
      
      if (data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const response = await axios.post('/api/campaigns', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Muestra un toast en lugar de un alert
      toast.success('Campaña creada exitosamente');

      reset();
      setImagePreview(null);

      // Redirige a my-campaigns después de 2 segundos de mostrar el toast
      setTimeout(() => {
        window.location.href = '/my-campaigns';
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Errores de validación:', error.response.data.errors);
        toast.error('Hay un error en los datos enviados.');
      } else {
        console.error('Error al crear la campaña', error);
        toast.error('Error al crear la campaña');
      }
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4 text-center">Crear Campaña</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item"><a href="/panel">Inicio</a></li>
        <li className="breadcrumb-item"><a href="/campaign">Campañas</a></li>
        <li className="breadcrumb-item active">Crear campaña</li>
      </ol>

      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body className="text-bg-light">
            <Row className="g-4">
              <Col md={6}>
                <Form.Label>Título:</Form.Label>
                <Form.Control
                  type="text"
                  {...register('title', { required: true })}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title && 'Título es requerido'}
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register('description', { required: true })}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description && 'Descripción es requerida'}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>Meta:</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register('goal', { required: true })}
                  isInvalid={!!errors.goal}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.goal && 'Meta es requerida'}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>Fecha de inicio:</Form.Label>
                <Form.Control
                  type="date"
                  {...register('start_date', { required: true })}
                  isInvalid={!!errors.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_date && 'Fecha de inicio es requerida'}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>Fecha de finalización:</Form.Label>
                <Form.Control
                  type="date"
                  {...register('end_date', { required: true })}
                  isInvalid={!!errors.end_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.end_date && 'Fecha de finalización es requerida'}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <ImageUpload register={register} errors={errors} setImagePreview={setImagePreview} />
              </Col>
            </Row>
          </Card.Body>

          <Card.Footer className="text-center">
            <Button type="submit" variant="primary">Guardar</Button>
          </Card.Footer>
        </Form>
      </Card>

      {/* Agrega el contenedor de los toasts */}
      <ToastContainer />
    </div>
  );
};

export default CreateCampaign;


