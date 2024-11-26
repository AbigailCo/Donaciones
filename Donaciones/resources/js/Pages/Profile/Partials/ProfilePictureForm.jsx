import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePictureForm = ({onLoading }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onLoading) onLoading(true);
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const response = await axios.post("/user/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(file);
      window.location.reload();
      toast.success("La foto de perfilfue actualizada");
    } catch (error) {
      console.error(error);
      toast.error("La foto de perfil no fue actualizada");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="w-50 p-4 bg-light shadow rounded"
      >
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
