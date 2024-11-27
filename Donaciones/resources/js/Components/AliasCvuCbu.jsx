import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AliasCvuCbu = ({ onFieldChange }) => {
  const {
    register,
    setValue,
    formState: { errors },
    clearErrors,
    handleSubmit,
    getFieldState,
  } = useForm();
  const [selectedField, setSelectedField] = useState(null);

  const handleFieldSelection = (field) => {
    setSelectedField(field);
    clearErrors(field); 
    setValue(field, ""); 
    onFieldChange({ field, value: "" }); 
  };

  const handleInputChange = (field, value) => {
    setValue(field, value);
    onFieldChange({ field, value }); 
  };

  const onSubmit = (data) => {
    console.log("Datos validados y enviados al padre:", data);
  };

  return (
    <div>
      <h6>Selecciones el metodo para recibir sus donaciones</h6>
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-outline-primary me-2"
          onClick={() => handleFieldSelection("alias")}
        >
          Alias
        </button>
        <button
          type="button"
          className="btn btn-outline-primary me-2"
          onClick={() => handleFieldSelection("cvu")}
        >
          CVU
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => handleFieldSelection("cbu")}
        >
          CBU
        </button>
      </div>

      {/* Alias */}
      {selectedField === "alias" && (
        <div className="mb-3">
          <label htmlFor="alias" className="form-label">Alias</label>
          <input
            id="alias"
            type="text"
            className={`form-control ${
              errors.alias
                ? "is-invalid"
                : (getFieldState("alias")?.isTouched && !errors.alias ? "is-valid" : "")
            }`}
            {...register("alias", {
              required: "El alias es obligatorio.",
              pattern: {
                value: /^\S+$/,
                message: "El alias no debe contener espacios en blanco.",
              },
            })}
            onChange={(e) => handleInputChange("alias", e.target.value)}
          />
          {errors.alias && <div className="invalid-feedback">{errors.alias.message}</div>}
        </div>
      )}

      {/* CVU */}
      {selectedField === "cvu" && (
        <div className="mb-3">
          <label htmlFor="cvu" className="form-label">CVU</label>
          <input
            id="cvu"
            type="text"
            className={`form-control ${
              errors.cvu
                ? "is-invalid"
                : (getFieldState("cvu")?.isTouched && !errors.cvu ? "is-valid" : "")
            }`}
            {...register("cvu", {
              required: "El CVU es obligatorio.",
              pattern: {
                value: /^\d{22}$/,
                message: "El CVU debe tener exactamente 22 dígitos numéricos.",
              },
            })}
            onChange={(e) => handleInputChange("cvu", e.target.value)}
          />
          {errors.cvu && <div className="invalid-feedback">{errors.cvu.message}</div>}
        </div>
      )}

      {/* CBU */}
      {selectedField === "cbu" && (
        <div className="mb-3">
          <label htmlFor="cbu" className="form-label">CBU</label>
          <input
            id="cbu"
            type="text"
            className={`form-control ${
              errors.cbu
                ? "is-invalid"
                : (getFieldState("cbu")?.isTouched && !errors.cbu ? "is-valid" : "")
            }`}
            {...register("cbu", {
              required: "El CBU es obligatorio.",
              pattern: {
                value: /^\d{22}$/,
                message: "El CBU debe tener exactamente 22 dígitos numéricos.",
              },
            })}
            onChange={(e) => handleInputChange("cbu", e.target.value)}
          />
          {errors.cbu && <div className="invalid-feedback">{errors.cbu.message}</div>}
        </div>
      )}

      {/* Botón para enviar los datos */}
      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        className="btn btn-primary"
      >
        Depositar en la cuenta
      </button>
    </div>
  );
};

export default AliasCvuCbu;
