import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Campaigns from '../../Components/Campaign/Campaigns';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Campaign({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Campañas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
