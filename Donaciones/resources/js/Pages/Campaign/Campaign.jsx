import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Campaigns from "../../Components/Campaign/Campaigns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/Components/Dashboard/Sidebar";

export default function Campaign({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Campañas" />

      <div className="d-flex h-100">
        <div className="w-1/5">
          <Sidebar auth={auth} />
        </div>

        <div className="flex-1 mt-12 mx-4">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <h1 className="mt-4 text-center">Nuestras campañas</h1>
            <Campaigns />
          </div>
        </div>
      </div>
      <ToastContainer />
    </AuthenticatedLayout>
  );
}
