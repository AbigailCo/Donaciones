import React, { useEffect, useState } from "react";
import axios from "axios";
import EstaUserDona from "@/Components/Campaign/EstaUserDona";

export default function RelaUserDona(){
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/UserDona')
            .then(response => {
                console.log(response.data);
                const chartData = response.data.data.map(item => ({
                    x: item.user_id, // Usuario ID
                    y: parseFloat(item.total_amount), // Monto Donado convertido a número
                    name: `Usuario ${item.user_name} ID ${item.user_id} ` // Etiqueta para tooltip
                }));
                setData(chartData);
            })
            .catch(error => {
                console.error("Hubo un error al obtener las estadísticas", error);
            });
    }, []);
    return (
      <div style={{ width: '100%', marginTop: "38px" }}>
        <h1 className="mt-4 text-center">Usuario mas generoso</h1>
        <EstaUserDona data={data} />
      </div>
    );
}


