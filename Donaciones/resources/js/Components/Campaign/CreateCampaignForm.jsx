import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const CreateCampaignForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  axios.defaults.baseURL = 'http://127.0.0.1:8000/';

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/campaigns', data);
      console.log(response.data);

      store.addNotification({
        title: "Success!",
        message: "Campaign created successfully",
        type: "success",
        container: "top-right", // where to position the notification
        dismiss: {
          duration: 3000, // how long the notification should stay on screen
          onScreen: true
        }
      });

      // Redirect to campaigns page
      window.location.href = '/campaigns'; // Adjust the URL as needed

    } catch (error) {
      console.error('Error creating campaign:', error);
      
      store.addNotification({
        title: "Error!",
        message: "Failed to create campaign",
        type: "danger",
        container: "top-right",
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title">Title</label>
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

export default CreateCampaignForm;
