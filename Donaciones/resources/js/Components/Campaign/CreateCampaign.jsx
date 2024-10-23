//a este jsx lo incluye el jsx que esta en \resources\js\Pages\Campaign\CreateCampaign.jsx

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Col, Row, Card } from "react-bootstrap";
import ImageUpload from "@/Components/ImageUpload";
import YouTubeLinkInput from "@/Components/YouTubeLinkInput";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCampaign = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  /*  const [imagePreviews, setImagePreviews] = useState([]); */
  
  const [videoLink, setVideoLink] = useState(""); // Agregar el estado para el enlace de video
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Cargar categorías desde el backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories"); // Ajusta la URL según tu configuración
        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    fetchCategories();
  }, []);
  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("goal", data.goal);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("category_id", data.category_id);

      console.log("ESTOS SON LOS ARCHIVO? :", imageFiles);

      if (imageFiles) {
        imageFiles.forEach((image) => {
          formData.append("images[]", image); // 'images[]' para el backend
        });
      }

      // Agregar el enlace de video al FormData
      if (videoLink) {
        formData.append("youtube_link", videoLink);
      }
      // Log para ver los datos
      // Imprime el contenido de FormData
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const response = await axios.post("/api/campaigns", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) { // Verificar si la respuesta fue exitosa
        toast.success("Campaña creada exitosamente");
        reset();
        setImageFiles([]);
        setVideoLink("");
        setTimeout(() => {
          navigate("/my-campaigns");
          window.location.reload();  // Esto forzará una recarga de la página
      }, 2000);
      } else {
        throw new Error("Error desconocido en la creación de la campaña");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        toast.error("Hay un error en los datos enviados.");
      } else {
        toast.error("Error al crear la campaña");
      }
    } finally {
      setIsSubmitting(false); // Liberar el botón de envío
    }
  };

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4 text-center">Crear Campaña</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item">
          <a href="/panel">Inicio</a>
        </li>
        <li className="breadcrumb-item">
          <a href="/campaign">Campañas</a>
        </li>
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
                  {...register("title", { required: "El título es requerido" })}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Categoría:</Form.Label>
                <Form.Control
                  as="select"
                  {...register("category_id", {
                    required: "La categoría es requerida",
                  })}
                  isInvalid={!!errors.category_id}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.category_id?.message}
                </Form.Control.Feedback>
              </Col>
              <Col xs={12}>
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("description", {
                    required: "Descripción es requerida",
                  })}
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
                  {...register("goal", { required: "Meta es requerida" })}
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
                  {...register("start_date", {
                    required: "Fecha de inicio es requerida",
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
                  {...register("end_date", {
                    required: "Fecha de finalización es requerida",
                  })}
                  isInvalid={!!errors.end_date}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.end_date?.message}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <ImageUpload
                  register={register}
                  errors={errors}
                  /* setImagePreviews={setImagePreviews} */ setImageFiles={
                    setImageFiles
                  }
                />
              </Col>

              <Col md={6}>
                <YouTubeLinkInput
                  register={register}
                  errors={errors}
                  setVideoLink={setVideoLink}
                />
              </Col>
            </Row>
          </Card.Body>

          <Card.Footer className="text-center">
            <Button type="submit" variant="primary">
              Guardar
            </Button>
          </Card.Footer>
        </Form>
      </Card>

      <ToastContainer />
    </div>
  );
};

export default CreateCampaign;
