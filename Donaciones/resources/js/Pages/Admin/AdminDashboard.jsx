import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "../../Components/Dashboard/Sidebar.jsx";
import { Head } from "@inertiajs/react";
import { toast } from "react-toastify"; // Importa toast

const AdminDashboard = ({ auth }) => {
  //console.log("Auth data:", auth);

  const [campaigns, setCampaigns] = useState([]);
  const [campaignsCurrentPage, setCampaignsCurrentPage] = useState(1);
  const [campaignsLastPage, setCampaignsLastPage] = useState(1);

  const [users, setUsers] = useState([]);
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [usersLastPage, setUsersLastPage] = useState(1);

  const toggleCampaignStatus = (id, status) => {
    const isActive = status === "active";
    const action = isActive ? "deshabilitar" : "habilitar";

    if (window.confirm(`¿Estás seguro de que quieres ${action} esta campaña?`)) {
        axios
        .put(`/admin/campaigns/${id}/status/${isActive ? "disabled" : "active"}`)
            .then(() => {
                setCampaigns((prevCampaigns) =>
                    prevCampaigns.map((campaign) =>
                        campaign.id === id
                            ? { ...campaign, status: isActive ? "disabled" : "active" }
                            : campaign
                    )
                );
                toast.success(`Campaña ${isActive ? "deshabilitada" : "habilitada"} correctamente.`);
            })
            .catch((error) => {
                console.error(`Error al ${action} la campaña:`, error);
                toast.error(`Ocurrió un error al ${action} la campaña.`);
            });
    }
};


const toggleUserStatus = (id, status) => {
  const isActive = status === "active";
  const action = isActive ? "deshabilitar" : "habilitar";

  if (window.confirm(`¿Estás seguro de que quieres ${action} este usuario?`)) {
    axios.put(`/admin/users/${id}/status/${isActive ? "disabled" : "active"}`)
          .then(() => {
              setUsers((prevUsers) =>
                  prevUsers.map((user) =>
                      user.id === id
                          ? { ...user, status: isActive ? "disabled" : "active" }
                          : user
                  )
              );
              toast.success(`Usuario ${isActive ? "deshabilitado" : "habilitado"} correctamente.`);
          })
          .catch((error) => {
              console.error(`Error al ${action} el usuario:`, error);
              toast.error(`Ocurrió un error al ${action} el usuario.`);
          });
  }
};




  // Función para asignar rol de administrador
  const assignAdmin = (userId) => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres asignar este usuario como administrador?"
      )
    ) {
      axios
        .put(`/admin/users/${userId}/assign-admin`)
        .then((response) => {
          toast.success("Rol de administrador asignado correctamente.");
          // Actualiza el estado de los usuarios
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, role: "admin" } : user
            )
          );
        })
        .catch((error) => {
          console.error("Error al asignar rol de admin:", error);
          toast.error(
            error.response?.data?.error ||
              "Ocurrió un error al asignar el rol de administrador."
          );
        });
    }
  };
  // Función para quitar rol de administrador
  const removeAdmin = (userId) => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres quitar el rol de administrador a este usuario?"
      )
    ) {
      axios
        .put(`/admin/users/${userId}/remove-admin`)
        .then((response) => {
          toast.success("Rol de administrador eliminado correctamente.");
          // Actualizo el estado de los usuarios
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, role: "user" } : user
            )
          );
        })
        .catch((error) => {
          console.error("Error al quitar rol de admin:", error);
          toast.error(
            error.response?.data?.error ||
              "Ocurrió un error al quitar el rol de administrador."
          );
        });
    }
  };

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

  

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="AdminPanel" />

      <div className="d-flex h-100 mt-12">
        <div className="w-1/7">
          <Sidebar auth={auth} />
        </div>
        <div className="flex-1 mx-4">
          <h3 className="text-center">Panel de Administración</h3>

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
                  <td className="py-2 px-4 border-b text-center">
                    {campaign.id}
                  </td>
                  <td className="py-2 px-4 border-b">{campaign.title}</td>
                  <td className="py-2 px-4 border-b">
                    {campaign.user ? campaign.user.name : "Sin usuario"}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                  
                  <button
                  onClick={() => toggleCampaignStatus(campaign.id, campaign.status)}
                  className={`px-4 py-2 rounded ${
                      campaign.status === "active"
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-green-500 hover:bg-green-600 text-white"
                  }`}
              >
                  {campaign.status === "active" ? "Deshabilitar" : "Habilitar"}
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación para campañas */}
          <div className="mt-4 flex justify-center items-center">
            <button
              onClick={() =>
                setCampaignsCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={campaignsCurrentPage === 1}
              className="bg-gray-300 px-4 py-2 mx-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {campaignsCurrentPage} de {campaignsLastPage}
            </span>
            <button
              onClick={() =>
                setCampaignsCurrentPage((prev) =>
                  Math.min(prev + 1, campaignsLastPage)
                )
              }
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
                  <th className="py-2 px-4 border-b">Rol</th>
                  <th className="py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const createdAt = new Date(user.created_at);
                  const formattedDate = createdAt.toLocaleDateString("es-ES");
                  const formattedTime = createdAt.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  return (
                    <tr key={user.id}>
                      <td className="py-2 px-4 border-b text-center">
                        {user.id}
                      </td>
                      <td className="py-2 px-4 border-b">{user.name}</td>
                      <td className="py-2 px-4 border-b">{user.email}</td>
                      <td className="py-2 px-4 border-b">
                        {user.role ? user.role : "Sin rol asignado"}
                      </td>
                      <td className="py-2 px-4 border-b text-center">
                        <td className="py-2 px-4 border-b text-center text-center">
                          {user.role === "admin" ? (
                            <>
                              <span className="text-green-500 text-sm">
                                Administrador
                              </span>
                              <button
                                onClick={() => removeAdmin(user.id)}
                                className="bg-yellow-500 text-white text-sm px-2 py-1 rounded hover:bg-yellow-600 ml-1"
                              >
                                Quitar Admin
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => assignAdmin(user.id)}
                              className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
                            >
                              Asignar Admin
                            </button>
                          )}
                          <button
                            onClick={() => toggleUserStatus(user.id, user.status)}
                            className={`text-sm px-2 py-1 rounded ${user.status === "active" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white`}
                          >
                            {user.status === "active" ? "Deshabilitar" : "Habilitar"}
                          </button>
                        </td>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Paginación para usuarios */}
            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={() =>
                  setUsersCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={usersCurrentPage === 1}
                className="bg-gray-300 px-4 py-2 mx-2 rounded disabled:opacity-50"
              >
                Anterior
              </button>
              <span>
                Página {usersCurrentPage} de {usersLastPage}
              </span>
              <button
                onClick={() =>
                  setUsersCurrentPage((prev) =>
                    Math.min(prev + 1, usersLastPage)
                  )
                }
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