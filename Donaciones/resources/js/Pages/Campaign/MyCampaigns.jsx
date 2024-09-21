import React from 'react';
import { Head } from '@inertiajs/react';

export default function MyCampaigns({ campaigns }) {
    console.log(campaigns);

    // Verifica si `campaigns` está definido y es un array
    if (!campaigns || campaigns.length === 0) {

        return (
            <div>
                <Head title="Mis Campañas" />
                <h1 className="text-2xl font-bold mb-4">Mis Campañas</h1>
                <p>No hay campañas disponibles.</p>
            </div>
        );
    }

    return (
        <div>
            <Head title="Mis Campañas" />
            <h1 className="text-2xl font-bold mb-4">Mis Campañas</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{campaign.title}</h2>
                        <p className="text-gray-600">{campaign.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
