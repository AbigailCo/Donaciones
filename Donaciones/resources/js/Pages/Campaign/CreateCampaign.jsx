//este jsx INCLUYE al createcampaign que esta en \resources\js\Components\Campaign\CreateCampaign.jsx

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import FormCreateCampaign from "../../Components/Campaign/CreateCampaign";
import Sidebar from "@/Components/Dashboard/Sidebar";
export default function CreateCampaign({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Crear campaña" />

      <div className="d-flex h-100 mt-12">
        <div className="w-1/5">
          <Sidebar auth={auth} />
        </div>

        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <FormCreateCampaign />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
