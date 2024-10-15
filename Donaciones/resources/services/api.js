// En src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/'; // Asegúrate de que sea la URL correcta de tu backend Laravel

export const searchCampaigns = async (term) => {
  try {
    const response = await axios.get(`${API_URL}campaigns/search`, {
      params: { term } // Pasamos el término de búsqueda
    });

    if (response.data && response.data.length > 0) {
      return response.data; // Devolver campañas filtradas
    } else {
      return []; // Si no hay coincidencias, devolver array vacío
    }
  } catch (error) {
    console.error('Error al buscar campañas:', error);
    return [];
  }
};
export const getCategories = async () => {
  const response = await axios.get('/categories');
  return response.data;
};

