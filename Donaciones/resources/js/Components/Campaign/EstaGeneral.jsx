import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const EstaGeneral = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        barSize={40} // Tamaño fijo para las barras
        barCategoryGap="20%" // Espaciado uniforme entre categorías
        barGap={2} // Espaciado entre barras dentro del mismo grupo
      >
        <CartesianGrid strokeDasharray="5 5" stroke="#ccc" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 16 }} 
          padding={{ left: 20, right: 20 }} // Espacio adicional en los extremos
        />
        <YAxis tick={{ fontSize: 16 }} />
        <Tooltip cursor={{ fill: "#f5f5f5" }} />
        <Legend layout="horizontal" verticalAlign="top" align="center" />

        <Bar dataKey="total" fill="#1a0afc" radius={[10, 10, 0, 0]}>
          <LabelList dataKey="total" position="top" style={{ fontSize: 12 }} />
        </Bar>
        <Bar dataKey="completadas" fill="#00b30c" radius={[10, 10, 0, 0]}>
          <LabelList
            dataKey="completadas"
            position="top"
            style={{ fontSize: 12 }}
          />
        </Bar>
        <Bar dataKey="incompletas" fill="#fcb30a" radius={[10, 10, 0, 0]}>
          <LabelList
            dataKey="incompletas"
            position="top"
            style={{ fontSize: 12 }}
          />
        </Bar>
        <Bar dataKey="activas" fill="#0afc9b" radius={[10, 10, 0, 0]}>
          <LabelList
            dataKey="activas"
            position="top"
            style={{ fontSize: 12 }}
          />
        </Bar>
        <Bar dataKey="inactivas" fill="#fc0a0a" radius={[10, 10, 0, 0]}>
          <LabelList
            dataKey="inactivas"
            position="top"
            style={{ fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EstaGeneral;
