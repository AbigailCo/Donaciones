import axios from 'axios';
import * as XLSX from "xlsx";
import React from "react";
import { Button} from 'react-bootstrap';


const fetchData = async () => {
    try {
      const estadisGenerales = await axios.get('/estadisGenerales');
      const donationCorrelation = await axios.get('/UserDona');
      const metrics = await axios.get('/estadisConvinada');
      const response = await axios.get("/allCampaigns");
    const campaigns = response.data.campaigns;
  
      return {
        estadisGenerales: estadisGenerales.data,
        donationCorrelation: donationCorrelation.data.data,
        metrics: metrics.data,
        campaigns,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const exportToExcel = async () => {
    try {
      // Paso 1: Obtener los datos
      const { estadisGenerales, donationCorrelation, metrics, campaigns } = await fetchData();
  
      // Paso 2: Crear el libro de Excel
      const workbook = XLSX.utils.book_new();
  
      // Paso 3: Convertir los datos a hojas
      const campaignsSheet = XLSX.utils.json_to_sheet(campaigns);
      XLSX.utils.sheet_add_aoa(campaignsSheet, [
        [
          "ID",
          "Título",
          "Descripción",
          "Meta",
          "Total Donado",
          "Fecha de Inicio",
          "Fecha de Fin",
          "ID Usuario",
          "Enlace YouTube",
          "Fecha Creación",
          "Fecha Actualización",
          "Fecha Eliminación",
          "Nombre de Categoría",
          "Latitud",
          "Longitud",
          "Dirección",
        ],
      ], { origin: "A1" });
      XLSX.utils.book_append_sheet(workbook, campaignsSheet, "Todas las campañas");

      // Estadísticas generales
      const estadisSheet = XLSX.utils.json_to_sheet([estadisGenerales]); // Es un objeto
      XLSX.utils.book_append_sheet(workbook, estadisSheet, "Estados de campañas");
  
      // Correlación de donaciones
      const donationSheet = XLSX.utils.json_to_sheet(donationCorrelation); // Es un array
      XLSX.utils.book_append_sheet(workbook, donationSheet, "Usuarios mas generosos");
  
      // Métricas de campañas
      const campaignDataSheet = XLSX.utils.json_to_sheet(metrics.campaignData);
      XLSX.utils.book_append_sheet(workbook, campaignDataSheet, "Campañas");
  
      const donationsOverTimeSheet = XLSX.utils.json_to_sheet(metrics.donationsOverTime);
      XLSX.utils.book_append_sheet(workbook, donationsOverTimeSheet, "Donaciones por Fecha");
  
      const campaignStatsSheet = XLSX.utils.json_to_sheet(metrics.campaignStats);
      XLSX.utils.book_append_sheet(workbook, campaignStatsSheet, "Estadísticas de Usuarios");
  
      // Paso 4: Descargar el archivo Excel
      XLSX.writeFile(workbook, "Estadísticas_Campañas.xlsx");
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };
  const GeneraExcel = () => {
    return (
        <Button
        style={{
            background: 'linear-gradient(90deg, #4a90e2, #ff00d9)',
            border: 'none',
            color: '#000000',
            fontWeight: 'bold',
            padding: '10px 20px',
            borderRadius: '30px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
        }}
        onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        }}
        onClick={exportToExcel}
      >
      Exportar Estadísticas a Excel
      </Button>
    );
  };

  
  
  export default GeneraExcel;


