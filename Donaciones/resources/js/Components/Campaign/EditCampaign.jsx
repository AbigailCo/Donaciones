import React from 'react';
import { useForm } from 'react-hook-form';

const EditCampaignForm = ({ campaign, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: campaign.title,
      description: campaign.description,
      goal: campaign.goal,
      end_date: campaign.end_date
    }
  });

  // Enviar los datos al backend al hacer submit
  const handleFormSubmit = data => {
    onSubmit(data); // Llamar a la función onSubmit pasada como prop
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'El título es obligatorio' })}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <div>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          {...register('description', { required: 'La descripción es obligatoria' })}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </div>

      <div>
        <label htmlFor="goal">Meta de recaudación</label>
        <input
          id="goal"
          type="number"
          {...register('goal', { required: 'La meta es obligatoria' })}
        />
        {errors.goal && <span>{errors.goal.message}</span>}
      </div>

      <div>
        <label htmlFor="end_date">Fecha de finalización</label>
        <input
          id="end_date"
          type="date"
          {...register('end_date', { required: 'La fecha de finalización es obligatoria' })}
        />
        {errors.end_date && <span>{errors.end_date.message}</span>}
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default EditCampaignForm;
