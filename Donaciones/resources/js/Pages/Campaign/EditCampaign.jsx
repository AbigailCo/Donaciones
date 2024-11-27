import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import EditCampaignForm from "@/Components/Campaign/EditCampaign";
import Sidebar from "@/Components/Dashboard/Sidebar";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import EditImagesCampaign from "@/Components/Campaign/EditImagesCampaign";
import EditYoutubeLink from "@/Components/Campaign/EditYoutubeLink";
export default function EditCampaign({ auth }) {
  const { campaign } = usePage().props;
  const [formData, setFormData] = useState({
    title: campaign.title,
    description: campaign.description,
    goal: campaign.goal,
    end_date: campaign.end_date,
  });

  useEffect(() => {
    setFormData({
      title: campaign.title,
      description: campaign.description,
      goal: campaign.goal,
      end_date: campaign.end_date,
    });
  }, [campaign]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí enviarías los datos al backend para actualizar la campaña
      await axios.put(`/campaigns/${campaign.id}`, formData);
      // Redirigir al usuario a la lista de campañas
      Inertia.visit(`/campaigns/${campaign.id}`);
    } catch (error) {
      console.error("Error al actualizar la campaña", error);
    }
  };
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Editar campaña" />

      <div className="d-flex h-100 mt-12">
        <div className="w-1/7">
          <Sidebar auth={auth} />
        </div>

        <div className="flex-1 mx-4  ">
          <h3 className="text-center">Panel de Edición</h3>

          {/* Panel de Edición */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full mt-0">
            {/* Sección de imágenes */}
            <div className="bg-white shadow-sm rounded-md p-3">
              <h4 className="text-base font-medium text-center mb-3">
                Editar Imágenes
              </h4>
              <EditImagesCampaign campaignId={campaign.id} />
            </div>

            {/* Sección de enlace de YouTube */}
            <div className="bg-white shadow-sm rounded-md p-3">
              <h4 className="text-base font-medium text-center mb-3">
                Editar enlace de YouTube
              </h4>
              <EditYoutubeLink campaign={campaign} />
            </div>
          </div>

          {/* Formulario de edición */}
          <div className="bg-white shadow-md rounded-md p-6 ">
            <form onSubmit={handleSubmit} className="space-y-6">
         
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="goal"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meta de la campaña
                </label>
                <input
                  type="number"
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Fecha de cierre
                </label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
