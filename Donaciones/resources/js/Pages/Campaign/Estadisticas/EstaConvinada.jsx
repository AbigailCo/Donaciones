import React, { useState, useEffect } from "react";
import {
    BarChart,
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area,
    ResponsiveContainer,
} from "recharts";
import axios from "axios";

const EstaConvinada = () => {
    const [data, setData] = useState([]);
    const [donationData, setDonationData] = useState([]);
    const [campaignData, setCampaignData] = useState([]);

    useEffect(() => {
        // Solicitar los datos del backend
        axios
            .get("/estadisConvinada")
            .then((response) => {
                console.log(response.data);
                setData(response.data.campaignData);
                setDonationData(response.data.donationsOverTime);
                setCampaignData(response.data.campaignStats);
            })
            .catch((error) => {
                console.error("Error al obtener los datos", error);
            });
    }, []);




    return (
        <div style={{ marginTop: "40px" }}>
            <h1 className="mt-4 text-center">Alcanse de las campañas y recaudaciones</h1>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="alcance" stackId="a" fill="#82ca9d" name="Personas que donaron" />
                    <Bar dataKey="donaciones" stackId="a" fill="#8884d8" name="Cantidad $" />
                </BarChart>
            </ResponsiveContainer>
            <h1 className="mt-4 text-center">Interaccion de usuarios con la plataforma</h1>

            {/* Area Chart para mostrar la acumulación de donaciones a lo largo del tiempo */}
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={donationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="total_donations"
                        stroke="#8884d8"
                        fill="#8884d8"
                        name="Monto diario donado"
                    />
                </AreaChart>
            </ResponsiveContainer>

            <h1 className="mt-7 text-center">Usuarios: sus donaciones y campañas activas</h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={campaignData} barCategoryGap="0%">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                         dataKey={(data) => `${data.user_id} - ${data.user_name}`}
                        label={{
                            value: "Usuarios",
                            position: "insideBottom",
                            offset: -5,
                        }}
                    />
                    <YAxis
                        yAxisId="left"
                        label={{
                            value: "Campañas Activas",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        label={{
                            value: "Monto Total Donado",
                            angle: -90,
                            position: "insideRight",
                        }}
                    />
                    <Tooltip
                        formatter={(value, name) => {
                            if (name === "Monto Total Donado") {
                                return new Intl.NumberFormat("es-AR", {
                                    style: "currency",
                                    currency: "ARS",
                                }).format(value);
                            }
                            return value;
                        }}
                        /* labelFormatter={(user_name) => `Usuario ID: ${user_name}`} */
                    />
                    <Legend verticalAlign="bottom" height={56} />
                    <Bar
                        yAxisId="left"
                        dataKey="total_campaigns"
                        fill="#413ea0"
                        name="Campañas Activas"
                    />
                    <Bar
                        yAxisId="right"
                        dataKey="total_donations"
                        fill="#ff7300"
                        name="Monto Total Donado"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EstaConvinada;
