import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import General from "./Estadisticas/General";
import UserDona from "./Estadisticas/RelaUserDona";
import Convinada from "./Estadisticas/EstaConvinada";
import GeneraExcel from "./Estadisticas/GeneraExcel";
import Sidebar from "@/Components/Dashboard/Sidebar";

export default function CampaignGeneral({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Estadísticas de Campañas" />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="w-1/5">
          <Sidebar auth={auth} />
        </div>
        <div style={{ width: "80%", padding: "0 20px", marginTop: "50px" }}>
          <div className="bg-gradient-to-r from-blue-500 to-fuchsia-500 shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="p-6 text-center text-white">
              <h1 className="text-3xl font-bold">
                Estadisticas de la plataforma
              </h1>
              <p className="mt-2 text-lg">
                Descubre como impacta Dar Vuelve en la sociedad
              </p>
            </div>
          </div>
          <GeneraExcel/>
          <General />
          <UserDona />
          <Convinada />

        </div>
      </div>
    </AuthenticatedLayout>
  );
}
