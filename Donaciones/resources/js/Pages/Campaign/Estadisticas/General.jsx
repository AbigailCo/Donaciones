import React, { useEffect, useState } from "react";
import axios from "axios";
import EstaGeneral from "@/Components/Campaign/EstaGeneral";

export default function General(){
    const [data, setData] = useState([]);

    useEffect(() => {
      // Aquí realizas la solicitud para obtener los datos desde Laravel
      axios
        .get("/estadisGenerales")
        .then((response) => {
          // Reestructuramos los datos para que se ajusten al gráfico
          const chartData = [
            { name: "Total de Campañas", total: response.data.totalCampaigns },
            { name: "Campañas Activas", activas: response.data.activeCampaigns },
            {
              name: "Campañas inactivas",
              inactivas: response.data.inactiveCampaign,
            },
            {
              name: "Campañas Completadas",
              completadas: response.data.completedCampaigns,
            },
            {
              name: "Campañas incompletas",
              incompletas: response.data.incompletedCampaign,
            },
          ];
          setData(chartData); // Establecemos los datos reestructurados
          console.log(chartData); // Verifica en la consola los datos reestructurados
        })
        .catch((error) => {
          console.error("Hubo un error al obtener las estadísticas", error);
        });
    }, []);
    return (
      <div style={{ marginTop: "38px" }}>
        <h2>Estadisticas generales</h2>
        <EstaGeneral data={data} />
      </div>
    );
}


