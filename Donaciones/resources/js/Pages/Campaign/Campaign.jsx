import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CampaignCards from '../../Components/Campaign/CampaignCard';

export default function Campaign({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Campañas</h2>}
        >
            <Head title="Campaign" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <CampaignCards />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
