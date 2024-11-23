import { useState } from 'react';
import axios from 'axios';

const ProfilePictureForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profile_picture', file);

    try {
      await axios.post('/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Foto de perfil actualizada');
    } catch (error) {
      console.error(error);
      alert('Error al actualizar la foto de perfil');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="w-50 p-4 bg-light shadow rounded">
        <h3 className="text-center mb-4">Actualizar Foto de Perfil</h3>
        <div className="mb-3">
          <label htmlFor="profile_picture" className="form-label">
            Elige una foto
          </label>
          <input
            type="file"
            id="profile_picture"
            onChange={handleFileChange}
            className="form-control"
            accept="image/*"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Actualizar Foto
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePictureForm;
