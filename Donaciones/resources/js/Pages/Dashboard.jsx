import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CampaignCard from '../Components/Campaign/CardPanel.jsx';
import MyCampPanel from '../Components/Campaign/MyCampPanel.jsx'
import CreatePanel from '../Components/Campaign/CreatePanel.jsx';
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
               
                <div className="bg-gradient-to-r from-blue-500 to-fuchsia-500 shadow-lg rounded-lg overflow-hidden mb-6">
                        <div className="p-6 text-center text-white">
                            <h1 className="text-3xl font-bold">BIENVENIDOS A DAR VUELVE</h1>
                            <p className="mt-2 text-lg">¡Tu plataforma para hacer la diferencia!</p>
                        </div>
                </div>                   
                </div>
                <CreatePanel/>
                <CampaignCard/>
                <MyCampPanel/>
            </div>
        </AuthenticatedLayout>
    );
}
