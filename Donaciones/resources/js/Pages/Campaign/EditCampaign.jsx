import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import ImageUpload from "@/Components/ImageUpload";
import YouTubeLinkInput from "@/Components/YouTubeLinkInput";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePage } from '@inertiajs/react';

const EditCampaign = () => {
  const { id } = usePage().props; // Obtener el ID de la campaña de los parámetros de la URL
  const navigate = useNavigate();
 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Cargar categorías
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    // Cargar datos de la campaña
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`/campaigns/${id}/edit`);
        const campaignData = response.data;

        // Asignar los datos de la campaña al formulario
        setValue("title", campaignData.title);
        setValue("description", campaignData.description);
        setValue("goal", campaignData.goal);
        setValue("start_date", campaignData.start_date);
        setValue("end_date", campaignData.end_date);
        setValue("category_id", campaignData.category_id);
        setValue("youtube_link", campaignData.youtube_link);
      } catch (error) {
        console.error("Error al cargar la campaña", error);
      }
    };

    fetchCategories();
    fetchCampaign();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      console.log(data);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("goal", data.goal);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("category_id", data.category_id);

      if (data.imageFiles) {
        data.imageFiles.forEach((image) => formData.append("images[]", image));
      }

      if (data.youtube_link) {
        formData.append("youtube_link", data.youtube_link);
      }

      await axios.put(`/campaigns/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      toast.success("Campaña actualizada exitosamente");
      setTimeout(() => {
        navigate("/my-campaigns");
        //window.location.reload(); 
       // console.log(campaign);
      }, 2000);
    } catch (error) {
      toast.error("Error al actualizar la campaña");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4 text-center">Editar Campaña</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <a href="/panel">Inicio</a>
        </li>
        <li className="breadcrumb-item">
          <a href="/campaign">Campañas</a>
        </li>
        <li className="breadcrumb-item active">Editar campaña</li>
      </ol>

      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body className="text-bg-light">
            <Row className="g-4">
              <Col md={6}>
                <Form.Label>Título:</Form.Label>
                <Form.Control type="text" {...register("title", { required: true })} isInvalid={!!errors.title} />
                <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Categoría:</Form.Label>
                <Form.Control as="select" {...register("category_id", { required: true })} isInvalid={!!errors.category_id}>
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.category_id?.message}</Form.Control.Feedback>
              </Col>
              <Col xs={12}>
                <Form.Label>Descripción:</Form.Label>
                <Form.Control as="textarea" rows={3} {...register("description", { required: true })} isInvalid={!!errors.description} />
                <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Meta:</Form.Label>
                <Form.Control type="number" step="0.01" {...register("goal", { required: true })} isInvalid={!!errors.goal} />
                <Form.Control.Feedback type="invalid">{errors.goal?.message}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Fecha de inicio:</Form.Label>
                <Form.Control type="date" {...register("start_date", { required: true })} isInvalid={!!errors.start_date} />
                <Form.Control.Feedback type="invalid">{errors.start_date?.message}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Fecha de finalización:</Form.Label>
                <Form.Control type="date" {...register("end_date", { required: true })} isInvalid={!!errors.end_date} />
                <Form.Control.Feedback type="invalid">{errors.end_date?.message}</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <ImageUpload register={register} errors={errors} setImageFiles={(files) => setValue("imageFiles", files)} />
              </Col>
              <Col md={6}>
                <YouTubeLinkInput register={register} errors={errors} setVideoLink={(link) => setValue("youtube_link", link)} />
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button type="submit" variant="primary" disabled={isSubmitting}>Guardar Cambios</Button>
          </Card.Footer>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default EditCampaign;
