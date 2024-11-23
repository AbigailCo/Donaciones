import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '../../Components/Dashboard/Sidebar.jsx';
import { Head } from '@inertiajs/react';
import { toast } from 'react-toastify'; // Importa toast

const AdminDashboard = ({ auth }) => {
  console.log("Auth data:", auth);

  const [campaigns, setCampaigns] = useState([]);
  const [campaignsCurrentPage, setCampaignsCurrentPage] = useState(1);
  const [campaignsLastPage, setCampaignsLastPage] = useState(1);

  const [users, setUsers] = useState([]);
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [usersLastPage, setUsersLastPage] = useState(1);

  // Paginado de campañas
  useEffect(() => {
    axios
      .get(`/admin/campaigns?page=${campaignsCurrentPage}`)
      .then((response) => {
        setCampaigns(response.data.data);
        setCampaignsCurrentPage(response.data.current_page);
        setCampaignsLastPage(response.data.last_page);
      })
      .catch((error) => console.error("Error cargando campañas:", error));
  }, [campaignsCurrentPage]);

  const deleteCampaign = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta campaña?")) {
      axios
        .delete(`/admin/campaigns/${id}`)
        .then(() => {
          setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
          toast.success("Campaña eliminada correctamente."); // Muestra el toast de éxito
        })
        .catch((error) => {
          console.error("Error al eliminar campaña:", error);
          toast.error("Ocurrió un error al eliminar la campaña."); // Muestra el toast de error
        });
    }
  };

  // Paginado de usuarios
  useEffect(() => {
    axios
      .get(`/admin/users?page=${usersCurrentPage}`)
      .then((response) => {
        setUsers(response.data.data);
        setUsersCurrentPage(response.data.current_page);
        setUsersLastPage(response.data.last_page);
      })
      .catch((error) => console.error("Error cargando usuarios:", error));
  }, [usersCurrentPage]);

  const deleteUser = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      axios
        .delete(`/admin/users/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
          toast.success("Usuario eliminado correctamente."); // Muestra el toast de éxito
        })
        .catch((error) => {
          console.error("Error al eliminar usuario:", error);
          toast.error("Ocurrió un error al eliminar el usuario."); // Muestra el toast de error
        });
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="AdminPanel" />
      
      <div className="d-flex h-100" style={{ marginTop: "4rem" }}>
        {/* Sidebar ocupa 25% del ancho */}
        <div className="w-1/4">
          <Sidebar auth={auth} />
        </div>

        {/* Contenido principal con margen izquierdo */}
        <div className="w-3/4 ml-4 py-4 bg-light">
          <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>

          {/* Campañas */}
          <h2 className="text-xl font-semibold mb-4">Campañas</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Creado por</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="py-2 px-4 border-b text-center">{campaign.id}</td>
                  <td className="py-2 px-4 border-b">{campaign.title}</td>
                  <td className="py-2 px-4 border-b">
                    {campaign.user ? campaign.user.name : "Sin usuario"}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => deleteCampaign(campaign.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación para campañas */}
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={() => setCampaignsCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={campaignsCurrentPage === 1}
              className="bg-gray-300 px-4 py-2 mx-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>Página {campaignsCurrentPage} de {campaignsLastPage}</span>
            <button
              onClick={() => setCampaignsCurrentPage((prev) => Math.min(prev + 1, campaignsLastPage))}
              disabled={campaignsCurrentPage === campaignsLastPage}
              className="bg-gray-300 px-4 py-2 mx-2 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>

          {/* Usuarios */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Usuarios</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Nombre</th>
                  <th className="py-2 px-4 border-b">Correo</th>
                  <th className="py-2 px-4 border-b">Registrado</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const createdAt = new Date(user.created_at);
                  const formattedDate = createdAt.toLocaleDateString('es-ES'); // dd/mm/yyyy
                  const formattedTime = createdAt.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }); // hh:mm
                  return (
                    <tr key={user.id}>
                      <td className="py-2 px-4 border-b text-center">{user.id}</td>
                      <td className="py-2 px-4 border-b">{user.name}</td>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">
                        {formattedDate} {formattedTime}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Paginación para usuarios */}
            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={() => setUsersCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={usersCurrentPage === 1}
                className="bg-gray-300 px-4 py-2 mx-2 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span>Página {usersCurrentPage} de {usersLastPage}</span>
              <button
                onClick={() => setUsersCurrentPage((prev) => Math.min(prev + 1, usersLastPage))}
                disabled={usersCurrentPage === usersLastPage}
                className="bg-gray-300 px-4 py-2 mx-2 rounded disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboard;
