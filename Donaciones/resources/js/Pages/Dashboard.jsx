import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React, { useState, useEffect } from "react";
import Sidebar from "../Components/Dashboard/Sidebar.jsx";
import CampaignSearch from "../Components/Campaign/CampaignSearch.jsx";
import CampaignMap from "@/Components/Dashboard/CampaignMap.jsx";
import axios from "axios";

export default function Dashboard({ auth }) {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("/campaigns")
      .then((response) => {
        setCampaigns(response.data.data);
      })
      .catch((error) => console.error("Error fetching campaigns:", error));
  }, []);

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Panel" />

      <div className="d-flex h-100  mt-12">

        <div className="w-1/7 ">
          <Sidebar auth={auth} />
        </div>
        <div className="flex-1 bg-white py-6 px-4 sm:px-6 lg:px-8 ">
          <div className="bg-gradient-to-r from-blue-500 to-fuchsia-500 shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="p-6 text-center text-white">
              <h1 className="text-3xl font-bold">BIENVENIDOS A DAR VUELVE</h1>
              <p className="mt-2 text-lg">
                ¡Tu plataforma para hacer la diferencia!
              </p>
            </div>
          </div>
          <CampaignSearch />
          <CampaignMap campaigns={campaigns} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
