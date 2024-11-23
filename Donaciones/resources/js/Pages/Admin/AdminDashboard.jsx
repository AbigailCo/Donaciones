import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '../../Components/Dashboard/Sidebar.jsx';
import { Head } from '@inertiajs/react';


const AdminDashboard = ({ auth }) => {
  console.log("Auth data:", auth);

  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [users, setUsers] = useState([]);

  // Cargar campañas por página
  useEffect(() => {
    axios
      .get(`/admin/campaigns?page=${currentPage}`)
      .then((response) => {
        setCampaigns(response.data.data); // Campañas actuales
        setCurrentPage(response.data.current_page); // Página actual
        setLastPage(response.data.last_page); // Última página
      })
      .catch((error) => console.error("Error cargando campañas:", error));
  }, [currentPage]);

  const deleteCampaign = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta campaña?")) {
      axios
        .delete(`/admin/campaigns/${id}`)
        .then(() => {
          setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
        })
        .catch((error) => console.error("Error al eliminar campaña:", error));
    }
  };
  // Cargar usuarios al cargar la página
useEffect(() => {
  axios
    .get(`/admin/users?page=${currentPage}`)
    .then((response) => {
      setUsers(response.data.data);
    })
    .catch((error) => console.error("Error cargando usuarios:", error));
}, [currentPage]);

// Función para borrar usuarios
const deleteUser = (id) => {
  if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
    axios
      .delete(`/admin/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.error("Error al eliminar usuario:", error));
  }
};

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="AdminPanel" />

<div className="d-flex h-100">
    {/* Sidebar ocupa 20% del ancho */}
    <div className="w-1/4">
        <Sidebar auth={auth} />
    </div> 
    <div>
    <div className="w-4/9 py-19 bg-light">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
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

      {/* Paginación */}
      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 px-4 py-2 mx-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {lastPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
          className="bg-gray-300 px-4 py-2 mx-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>

      <div>
    {/* Tabla de usuarios */}
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
        {users.map((user) => (
          <tr key={user.id}>
            <td className="py-2 px-4 border-b text-center">{user.id}</td>
            <td className="py-2 px-4 border-b">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.created_at}</td>
            <td className="py-2 px-4 border-b text-center">
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
);


    </div>
    </div>
    </div>
    </AuthenticatedLayout>

    
  );
};

export default AdminDashboard;


