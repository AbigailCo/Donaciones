import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, Row, Card } from 'react-bootstrap';
import ImageUpload from '@/Components/ImageUpload';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCampaign = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch, // Agregar watch para monitorear cambios
    reset,
  } = useForm();
  
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

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

      toast.success('Campaña creada exitosamente');
      reset();
      setImagePreview(null);

      setTimeout(() => {
        window.location.href = '/my-campaigns';
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        toast.error('Hay un error en los datos enviados.');
      } else {
        toast.error('Error al crear la campaña');
      }
    }
  };

  // Observar los valores de las fechas de inicio y fin
  const startDate = watch('start_date');
  const endDate = watch('end_date');

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
                  {...register('title', { required: 'El título es requerido' })}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Col>

              <Col xs={12}>
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register('description', { required: 'Descripción es requerida' })}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description?.message}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>Meta:</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  {...register('goal', { required: 'Meta es requerida' })}
                  isInvalid={!!errors.goal}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.goal?.message}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>Fecha de inicio:</Form.Label>
                <Form.Control
                  type="date"
                  {...register('start_date', {
                    required: 'Fecha de inicio es requerida',
                    validate: (value) => {
                      const endDate = new Date(getValues('end_date'));
                      const startDate = new Date(value);
                      return startDate <= endDate || 'La fecha de inicio no puede ser mayor que la fecha de finalización';
                    },
                  })}
                  isInvalid={!!errors.start_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.start_date?.message}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>Fecha de finalización:</Form.Label>
                <Form.Control
                  type="date"
                  {...register('end_date', {
                    required: 'Fecha de finalización es requerida',
                    validate: (value) => {
                      const startDate = new Date(getValues('start_date'));
                      const endDate = new Date(value);
                      return startDate <= endDate || 'La fecha de finalización no puede ser menor que la fecha de inicio';
                    },
                  })}
                  isInvalid={!!errors.end_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.end_date?.message}
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

      <ToastContainer />
    </div>
  );
};

export default CreateCampaign;
