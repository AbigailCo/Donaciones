import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import ProfilePictureForm from "./Partials/ProfilePictureForm";

export default function Edit({ auth, mustVerifyEmail, status }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Perfil" />
      <div className="bg-gradient-to-r from-blue-500 to-fuchsia-500 shadow-lg rounded-lg overflow-hidden mt-12 mb-6">
        <div className="p-6 text-center text-white">
          <h1 className="text-3xl font-bold">{auth.user?.name}</h1>
          <p className="mt-2 text-lg">Edita tu perfil</p>
        </div>
      </div>

      <div className="py-12">
        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
          <div className="d-flex justify-content-center align-items-center">
            {auth.user?.profile_picture ? (
              <div className="text-center">
                <img
                  src={`/storage/perfil/${auth.user?.profile_picture}`}
                  alt="Foto de perfil"
                  className="rounded-circle border border-3 border-primary"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <p className="mt-2 text-muted">{auth.user?.name}</p>
              </div>
            ) : (
              <div className="text-center">
                <img
                  src="/storage/perfil/defecto.png"
                  alt="Imagen predeterminada"
                  className="rounded-circle border border-3 border-secondary"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <h1 className="text-3xl font-bold">{auth.user?.name}</h1>
                <p className="mt-2 text-muted">No hay foto de perfil</p>
              </div>
            )}
          </div>
          <ProfilePictureForm />
          <UpdateProfileInformationForm
            mustVerifyEmail={mustVerifyEmail}
            status={status}
            className="max-w-xl"
          />
          <UpdatePasswordForm className="max-w-xl" />
          <DeleteUserForm className="max-w-xl" />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
