import { useState, useEffect } from "react";
import axios from "axios";

export default function FotoPerfil({ campaign }) {
    const [creator, setCreator] = useState(null);
    useEffect(() => {
        const fetchCreatorData = async () => {
            try {
                const response = await axios.get(`/userCreador/${campaign.id}`);
                console.log("este es el response", response.data);
                setCreator(response.data.user);
            } catch (error) {
                console.error("Error al obtener el creador:", error);
            }
        };

        if (campaign.id) {
            fetchCreatorData();
        }
    }, [campaign.id]);
    return (
        <div className="d-flex mb-2 justify-content-center align-items-center">
            {creator?.profile_picture ? (
                <div className="d-flex align-items-center">
                    <img
                        src={`/storage/perfil/${creator?.profile_picture}`}
                        alt="Foto de perfil"
                        className="rounded-circle border border-2 border-primary"
                        style={{
                            width: "40px",  // Tamaño más pequeño
                            height: "40px", // Tamaño más pequeño
                            objectFit: "cover",
                        }}
                    />
                    <p className="ms-2 text-muted" style={{ fontSize: '0.9rem' }}>{creator?.name}</p>
                </div>
            ) : (
                <div className="d-flex align-items-center">
                    <img
                        src="/storage/perfil/defecto.png"
                        alt="Imagen predeterminada"
                        className="rounded-circle border border-2 border-secondary"
                        style={{
                            width: "40px",  // Tamaño más pequeño
                            height: "40px", // Tamaño más pequeño
                            objectFit: "cover",
                        }}
                    />
                    <p className="ms-2 text-muted" style={{ fontSize: '0.9rem' }}>{creator?.name}</p>
                </div>
            )}
        </div>
    );
}
