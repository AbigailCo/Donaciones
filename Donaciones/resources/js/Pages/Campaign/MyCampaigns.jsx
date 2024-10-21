import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from '@inertiajs/react'; // Asegúrate de importar Link
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Importa el layout

const MyCampaigns = ({ campaigns, auth }) => {
  return (
    <div>
      {auth.user ? (  // Verifica si el usuario está logueado
        <AuthenticatedLayout user={auth.user}>  {/* Pasa el usuario al layout */}
          <div className="container mt-4">
            <h1 className="text-center">Mis Campañas</h1>
            <Row>
              {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                  <Col md={4} key={campaign.id} className="mb-4">
                      <Link href={`/my-campaigns/${campaign.id}`} style={{ textDecoration: 'none' }}>
                      <Card>
                        <Card.Body>
                          <Card.Title>{campaign.title}</Card.Title>
                          <Card.Text>{campaign.description}</Card.Text>
                          <Card.Text>Meta: {campaign.goal}</Card.Text>
                          <Card.Text>Fecha de Inicio: {campaign.start_date}</Card.Text>
                          <Card.Text>Fecha de Fin: {campaign.end_date}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))
              ) : (
                <p className="text-center">No tienes campañas creadas.</p>
              )}
            </Row>
          </div>
        </AuthenticatedLayout>
      ) : (
        <div className="text-center mt-5">
          <h2>Sesión expirada</h2>
          <p>Por favor, inicia sesión nuevamente.</p>
        </div>
      )}
    </div>
  );
};

export default MyCampaigns;

