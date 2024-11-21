import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StatisticsChart from '@/Components/Campaign/StatisticsChart';

export default function CampaignStatistics({ auth }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Aquí realizas la solicitud para obtener los datos desde Laravel
        axios.get('/estadisGenerales')
            .then(response => {
                // Reestructuramos los datos para que se ajusten al gráfico
                const chartData = [
                    { name: 'Total de Campañas', total: response.data.totalCampaigns },
                    { name: 'Campañas Activas', activas: response.data.activeCampaigns },
                    { name: 'Campañas Completadas', completadas: response.data.completedCampaigns },
                    { name: 'Campañas incompletas', incompletas: response.data.incompletedCampaign },
                    { name: 'Campañas inactivas', inactivas: response.data.inactiveCampaign }
                ];
                setData(chartData); // Establecemos los datos reestructurados
                console.log(chartData); // Verifica en la consola los datos reestructurados
            })
            .catch(error => {
                console.error("Hubo un error al obtener las estadísticas", error);
            });
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Estadísticas de Campañas" />

            <div style={{ marginTop: "38px" }}>
                <h2>Estadísticas de Campañas</h2>
                <StatisticsChart data={data} />
            </div>
        </AuthenticatedLayout>
    );
}
