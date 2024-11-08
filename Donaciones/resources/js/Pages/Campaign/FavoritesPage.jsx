import React from 'react';
import { Typography } from '@mui/material';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CampaignCard from '../../Components/Campaign/CampaignCard';  // Importa el componente CampaignCard

const FavoritesPage = ({ favorites, auth }) => {
    if (!favorites || favorites.length === 0) {
        return <div>No favorites available.</div>;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mis favoritos</h2>}
        >
            <Head title="Favorite" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <Typography variant="h4" gutterBottom>
                                Las campañas que han impactado en vos
                            </Typography>
                            {favorites.map((favorite) => (
                                <CampaignCard key={favorite.id} campaign={favorite.campaign} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FavoritesPage;
