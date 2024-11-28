import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CampaignCard from "@/Components/Campaign/CampaignCard";
import { Head, usePage, Link } from "@inertiajs/react";
import Sidebar from "@/Components/Dashboard/Sidebar";

const MyCampaigns = ({ campaigns, auth }) => {
  if (!auth.user) {
    return (
      <div className="text-center mt-5">
        <h2>Sesión expirada</h2>
        <p>Por favor, inicia sesión nuevamente.</p>
      </div>
    );
  }

  // Filtrar campañas activas (no deshabilitadas)
  const activeCampaigns = campaigns.filter(campaign => campaign.status !== "disabled");

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Mis campañas" />
      <div className="d-flex h-100 mt-12">
        <div className="w-1/7">
          <Sidebar auth={auth} />
        </div>

        <div className="flex-1 mx-4">
          <h3 className="text-center">Mis campañas</h3>
          <div className="mb-4" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Link href="/CreateCampaign" style={{ textDecoration: "none" }}>
              <Button
                style={{
                  background: "linear-gradient(90deg, #7eb8fc, #fc6fe7)",
                  border: "none",
                  color: "#000000",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  borderRadius: "30px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                variant="contained"
                color="primary"
              >
                Agregar Campaña
              </Button>
            </Link>
          </div>
          {activeCampaigns.length > 0 ? (
            <Grid container spacing={3}>
              {activeCampaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <CampaignCard campaign={campaign} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography
              className="text-center"
              variant="h5"
              color="textSecondary"
            >
              Todavía no creaste ninguna campaña en esta aplicación.
            </Typography>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default MyCampaigns;
