import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatisticsChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" /> 
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#1a0afc" /> 
        <Bar dataKey="completadas" fill="#00b30c" /> 
        <Bar dataKey="activas" fill="#0afc9b" /> 
        <Bar dataKey="incompletas" fill="#fcb30a" /> 
        <Bar dataKey="inactivas" fill="#fc0a0a" /> 
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
