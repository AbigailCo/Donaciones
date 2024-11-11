import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CampaignCard from '../Components/Campaign/CardPanel.jsx';
import MyCampPanel from '../Components/Campaign/MyCampPanel.jsx';
import CreatePanel from '../Components/Campaign/CreatePanel.jsx';
import Sidebar from '../Components/Dashboard/Sidebar.jsx';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            
        >
            <Head title="Dashboard" />

            <div className="d-flex h-100">
                {/* Sidebar ocupa 20% del ancho */}
                <div className="w-1/5">
                    <Sidebar auth={auth} />
                </div> 
                
                {/* Contenido principal ocupa 80% del ancho */}
                <div className="w-4/5 py-12 bg-light">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-gradient-to-r from-blue-500 to-fuchsia-500 shadow-lg rounded-lg overflow-hidden mb-6">
                            <div className="p-6 text-center text-white">
                                <h1 className="text-3xl font-bold">BIENVENIDOS A DAR VUELVE</h1>
                                <p className="mt-2 text-lg">¡Tu plataforma para hacer la diferencia!</p>
                            </div>
                        </div>
                        
                        {/* Componentes específicos del Dashboard */}
                       {/*  <CreatePanel />
                        <CampaignCard />
                        <MyCampPanel /> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
