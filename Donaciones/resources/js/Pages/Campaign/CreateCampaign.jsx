//este jsx INCLUYE al createcampaign que esta en \resources\js\Components\Campaign\CreateCampaign.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FormCreateCampaign from '../../Components/Campaign/CreateCampaign';
import ImageUpload from '../../Components/ImageUpload';
import Create from '@/Components/Campaign/Create';
export default function CreateCampaign({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Crear campaña</h2>}
        >
            <Head title="CreateCampaign" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                     {/* formcreatecampaign es el archivo que esta en Donaciones\Donaciones\resources\js\Components\Campaign\CreateCampaign.jsx */}   
                       <FormCreateCampaign/> 
                     
                       
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
