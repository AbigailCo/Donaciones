import React from 'react';
import { Typography } from '@mui/material';
import { Link } from '@inertiajs/react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import CampaignCard from '../../Components/Campaign/CampaignCard';  // Importa el componente CampaignCard

const FavoritesPage = ({ favorites, auth }) => {
    if (!favorites || favorites.length === 0) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                
            >
                <Head title="Favorite" />
    
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div>
                                <Typography className="text-center" variant="h4" gutterBottom>
                                    Todavia no elegiste ninguna campaña como favorita
                                </Typography>
                            </div>
                        </div>
                    </div>
                </div>
                
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
          
        >
            <Head title="Favorite" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                        <h1 className="mt-4 text-center">Mis favoritos</h1>
                            {favorites.map((favorite) => (
                                <CampaignCard key={favorite.id} campaign={favorite.campaign} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </AuthenticatedLayout>
    );
};

export default FavoritesPage;
