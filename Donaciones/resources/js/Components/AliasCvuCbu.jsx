import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AliasCvuCbu = ({ onFieldChange }) => {
    const { register, setValue, formState: { errors }, clearErrors, handleSubmit } = useForm();
    const [selectedField, setSelectedField] = useState(null);

    const handleFieldSelection = (field) => {
        setSelectedField(field);
        clearErrors(field); // Limpiar errores del campo previo
        setValue(field, ""); // Reinicia el valor del campo seleccionado
        onFieldChange({ field, value: "" }); // Notifica al componente padre
    };

    const handleInputChange = (field, value) => {
        setValue(field, value);
        onFieldChange({ field, value }); // Envía el valor al componente padre
    };

    const handleValidation = () => {
        // Intentar validar los campos antes de enviarlos al padre
        if (Object.keys(errors).length > 0) {
            return false; // Si hay errores, no enviamos los datos
        }
        return true; // Si no hay errores, enviamos los datos
    };

    const onSubmit = (data) => {
        if (handleValidation()) {
            console.log("Datos validados y enviados al padre:", data);
        } else {
            console.log("Hay errores en el formulario.");
        }
    };

    return (
        <div>
            <h4>¿Dónde quiere depositar las donaciones?</h4>
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

            {selectedField === "alias" && (
                <div className="mb-3">
                    <label htmlFor="alias" className="form-label">Alias</label>
                    <input
                        id="alias"
                        type="text"
                        className={`form-control ${errors.alias ? "border border-danger" : "border border-success"}`}
                        {...register("alias", {
                            required: "El alias es obligatorio.",
                            pattern: {
                                value: /^\S+$/,
                                message: "El alias no debe contener espacios en blanco.",
                            },
                        })}
                        onChange={(e) => handleInputChange("alias", e.target.value)}
                    />
                    {errors.alias && <p className="text-danger">{errors.alias.message}</p>}
                </div>
            )}

            {selectedField === "cvu" && (
                <div className="mb-3">
                    <label htmlFor="cvu" className="form-label">CVU</label>
                    <input
                        id="cvu"
                        type="text"
                        className={`form-control ${errors.cvu ? "border border-danger" : "border border-success"}`}
                        {...register("cvu", {
                            required: "El CVU es obligatorio.",
                            pattern: {
                                value: /^\d{22}$/,
                                message: "El CVU debe tener exactamente 22 dígitos numéricos.",
                            },
                        })}
                        onChange={(e) => handleInputChange("cvu", e.target.value)}
                    />
                    {errors.cvu && <p className="text-danger">{errors.cvu.message}</p>}
                </div>
            )}

            {selectedField === "cbu" && (
                <div className="mb-3">
                    <label htmlFor="cbu" className="form-label">CBU</label>
                    <input
                        id="cbu"
                        type="text"
                        className={`form-control ${errors.cbu ? "border border-danger" : "border border-success"}`}
                        {...register("cbu", {
                            required: "El CBU es obligatorio.",
                            pattern: {
                                value: /^\d{22}$/,
                                message: "El CBU debe tener exactamente 22 dígitos numéricos.",
                            },
                        })}
                        onChange={(e) => handleInputChange("cbu", e.target.value)}
                    />
                    {errors.cbu && <p className="text-danger">{errors.cbu.message}</p>}
                </div>
            )}

            {/* Botón para enviar los datos (no enviará hasta que no esté validado) */}
            <button type="button" onClick={handleSubmit(onSubmit)} className="btn btn-primary">
                Depositar en la cuenta
            </button>
        </div>
    );
};

export default AliasCvuCbu;
