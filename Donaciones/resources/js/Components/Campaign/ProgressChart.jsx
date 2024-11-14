import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Typography, Card, CardContent, Box } from '@mui/material';

const ProgressChart = ({ campaign, donations }) => {
    const totalDonado = donations.reduce((acc, donation) => acc + parseFloat(donation.amount), 0);
    const porcentajeProgreso = (totalDonado / campaign.goal) * 100;

    // Si el total donado excede la meta, ajustamos el faltante a 0
    const faltante = totalDonado >= campaign.goal ? 0 : campaign.goal - totalDonado;

    // Datos para el gráfico
    const data = [
        { name: 'Donado $', value: totalDonado },
        { name: 'Faltante $', value: faltante },
    ];

    // Colores para el gráfico
    const COLORS = ['#4CAF50', '#FF7043']; // Verde para donado, rojo para faltante
    const progressColor = porcentajeProgreso >= 100 ? '#4CAF50' : '#FF7043'; // Si es 100% o mayor, todo verde

    return (
        <Card sx={{ mt: 4, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.primary', mb: 2 }}>
                    Progreso hacia la meta
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="80%"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={index === 0 ? progressColor : COLORS[index % COLORS.length]} // Cambiar el color al 100% verde
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Mostrar el porcentaje en el centro del gráfico */}
                    <Typography
                        variant="h6"
                        sx={{
                            position: 'absolute',
                            fontWeight: 'bold',
                            color: porcentajeProgreso >= 100 ? 'primary.main' : 'text.secondary',
                        }}
                    >
                        {porcentajeProgreso >= 100 ? '100%' : porcentajeProgreso.toFixed(1)}%
                    </Typography>
                </Box>
                

                {/* Mostrar total donado */}
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        mt: 2,
                        fontWeight: 'bold',
                        color: porcentajeProgreso >= 100 ? 'primary.main' : 'text.secondary',
                    }}
                >
                    Total Donado: ${totalDonado.toLocaleString()} de ${campaign.goal.toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProgressChart;
