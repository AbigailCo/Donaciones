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

      <div className="d-flex h-100 mt-12">
        <div className="w-1/7">
          <Sidebar auth={auth} />
        </div>

        <div className="mt-4">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <h3 className="mb-6 text-center">Nuestras campañas</h3>
            <Campaigns />
          </div>
        </div>
      </div>
      <ToastContainer />
    </AuthenticatedLayout>
  );
}
