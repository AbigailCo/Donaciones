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
import MapboxMap from "@/Components/Campaign/MapboxMap";
import AliasCvuCbu from "../AliasCvuCbu";
import Joyride from "react-joyride";

const CreateCampaign = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [tourIsOpen, setTourIsOpen] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [donationField, setDonationField] = useState({
    field: null,
    value: "",
  });
  const handleFieldChange = ({ field, value }) => {
    setDonationField({ field, value });
  };
  const steps = [
    {
      target: ".step-1", // Selecciona el elemento donde deseas iniciar
      content:
        "Escribe el nombre de tu campaña. Las personas podran buscarte mas facil de esta manera.",
    },
    {
      target: ".step-2",
      content:
        "Asignale una categoria a tu campaña. De esta manera los donadores que tengan mas afinidad con una causa la encontraran mas rapido.",
    },
    {
      target: ".step-3",
      content:
        "Aquí puedes agregar una descripción para tu campaña. Cuenta de que se trata y porque decidiste crearla",
    },
    {
      target: ".step-4",
      content:
        "Indica la meta que deseas alcanzar con esta campaña. Cuanto dinero necesitan para poder solucionar la problematica",
    },
    {
      target: ".step-5",
      content:
        "Selecciona un metodo para recibir las donaciones a la campaña. Comprueba con el boton 'Depositar en la cuenta' si tu metodo es valido",
    },
    {
      target: ".step-6",
      content: "Selecciona las fechas de inicio y fin de tu campaña.",
    },
    {
      target: ".step-7",
      content:
        "Agregale imagenes a tu campaña para que llegue a mas donadores. Las imagenes son optativas y puedes agregar mas de una si lo deseas.",
    },
    {
      target: ".step-8",
      content:
        "Seleccionar un link de un video de YOUTUBE que haga referencia a la campaña para que tus donadores puedan obtener mas detalles",
    },
    {
      target: ".step-9",
      content:
        "Selecciona la direccion donde se ubica la campaña. Puedes arrastrar el mapa hasta la ubicacion moviendo el marcador celeste y haciendo zoom o si lo deseas podrias tambien buscar la direccion en la barra de busqueda. Ejemplo: Universidad Nacional del Comahue, Buenos Aires 1400, Neuquén, Neuquén Q8300, Argentina",
    },
    {
      target: ".step-10",
      content:
        "Haz clic en 'Guardar' una vez que hayas completado toda la informacion.",
    },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/categories");
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
    if (!coordinates.latitude || !coordinates.longitude) {
      toast.error("Elegir una ubicacion en el mapa es obligatorio.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("goal", data.goal);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("category_id", data.category_id);
      formData.append("latitude", coordinates.latitude);
      formData.append("longitude", coordinates.longitude);
      if (donationField.field && donationField.value) {
        formData.append(donationField.field, donationField.value);
      }

      if (imageFiles) {
        imageFiles.forEach((image) => {
          formData.append("images[]", image);
        });
      }

      if (videoLink) {
        formData.append("youtube_link", videoLink);
      }

      const response = await axios.post("/api/campaigns", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Campaña creada exitosamente");
        reset();
        setImageFiles([]);
        setVideoLink("");
        setTimeout(() => {
          navigate("/my-campaigns");
          window.location.reload();
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
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid px-4">
      <Joyride
        styles={{
          tooltip: {
            maxWidth: "400px", // Ajusta el tamaño de la tarjeta si es necesario
          },
        }}
        locale={{
          back: "Volver",
          next: "Siguiente",
          skip: "Omitir",
          last: "Finalizar",
        }}
        steps={steps}
        run={tourIsOpen}
        continuous={true}
        showSkipButton={true}
        showStepsProgress={true}
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setTourIsOpen(false);
          }
        }}
        disableScrolling={true}
      />
      <h2 className="mt-4 text-center">Crear campaña</h2>
      <h6 className="mb-4 text-center">da comienzo a una nueva campaña</h6>
      <div
      className="mb-4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => setTourIsOpen(true)}
          style={{
            background: "linear-gradient(90deg, #7eb8fc, #fc6fe7)",
            border: "none",
            color: "#000000",
            fontWeight: "bold",
            padding: "10px 20px",
            borderRadius: "30px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          Iniciar Tutorial
        </Button>
      </div>

      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Card.Body className="text-bg-light">
            <Row className="g-4">
              <Col md={6} className="step-1">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  {...register("title", { required: "El título es requerido" })}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title?.message}
                </Form.Control.Feedback>
              </Col>

              <Col md={6} className="step-2">
                <Form.Label>Categoría</Form.Label>
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

              <Col xs={12} className="step-2">
                <Form.Label>Descripción</Form.Label>
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

              <Col md={6} className="step-4">
                <Form.Label>Meta</Form.Label>
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
              <Col md={6} className="step-5">
              <AliasCvuCbu
                className="step-5"
                onFieldChange={handleFieldChange}
              />
                
              </Col>
              
              <Col md={6} className="step-6">
                <Form.Label>Fecha de inicio</Form.Label>
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
                <Form.Label>Fecha de finalización</Form.Label>
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

              <Col md={6} className="step-7">
                <ImageUpload
                  register={register}
                  errors={errors}
                  setImageFiles={setImageFiles}
                />
              </Col>

              <Col md={6} className="step-8">
                <YouTubeLinkInput
                  register={register}
                  errors={errors}
                  setVideoLink={setVideoLink}
                />
              </Col>

              <div className="step-9">
                <h6 className="text-2xl font-semibold text-center  mt-6 mb-4">
                 Donde se encuentra la campaña
                </h6>
                <h6 className="font-semibold text-center  mt-6 mb-4">
                 puedes escribir la dirección o acercar, alejar y arrastrar el mapa, asegurate de que el marcador celeste este en la ubicacion que corresponde a tu campaña
                </h6>
                <MapboxMap setCoordinates={setCoordinates} />
              </div>

              <Col xs={12}></Col>
            </Row>
          </Card.Body>

          <Card.Footer className="text-center ">
            <Button className="step-10" type="submit" variant="primary">
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
