import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CampaignCard from '../Components/Campaign/CardPanel.jsx'
export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Panel</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">ACA UN PANEL CON TODAS LAS FUNCIONALIDADES</div>
                    </div>
                    
                    
                </div>
                <CampaignCard/>
            </div>
        </AuthenticatedLayout>
    );
}
