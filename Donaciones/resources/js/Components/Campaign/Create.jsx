import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Create = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  axios.defaults.baseURL = 'http://localhost';
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/campaigns', data);
      console.log(response.data);
      // Manejar la respuesta después de la creación
    } catch (error) {
      console.error('Error creating campaign:', error);
      // Manejar el error
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">TitleEEEEEEEEEEEE</label>
      <input id="title" {...register('title', { required: true })} />
      {errors.title && <span>This field is required</span>}

      <label htmlFor="description">Description</label>
      <textarea id="description" {...register('description', { required: true })} />
      {errors.description && <span>This field is required</span>}

      <label htmlFor="goal">Goal</label>
      <input id="goal" type="number" {...register('goal', { required: true })} />
      {errors.goal && <span>This field is required</span>}

      <label htmlFor="start_date">Start Date</label>
      <input id="start_date" type="date" {...register('start_date', { required: true })} />
      {errors.start_date && <span>This field is required</span>}

      <label htmlFor="end_date">End Date</label>
      <input id="end_date" type="date" {...register('end_date', { required: true })} />
      {errors.end_date && <span>This field is required</span>}

      <button type="submit">Create Campaign</button>
    </form>
  );
};

export default Create;
