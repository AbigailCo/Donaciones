import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EstaUserDona = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
           <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Usuario ID" />
                <YAxis type="number" dataKey="y" name="Monto Donado" />
                <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    content={({ payload }) => {
                        if (!payload || payload.length === 0) return null;
                        const { name, y } = payload[0].payload;
                        return (
                            <div className="custom-tooltip">
                                <strong>{name}</strong>
                                <p>Monto Donado: ${y}</p>
                            </div>
                        );
                    }}
                />
                <Scatter name="Donaciones por Usuario" data={data} fill="#8884d8" />
            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default EstaUserDona;
