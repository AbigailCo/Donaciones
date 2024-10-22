import React, { useEffect, useState } from 'react';
import axios from '../../../config/axiosConfig';
import Modal from '@/Components/Modal'; // Asegúrate de que la ruta sea correcta

const Notifications = ({ show, onClose }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (show) { // Solo buscar notificaciones si el modal está abierto
            const fetchNotifications = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/api/notifications');
                    setNotifications(response.data);
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                    setNotifications([]); // O podrías establecer un mensaje de error en el estado
                }
            };

            fetchNotifications();
        }
    }, [show]); // Dependencia para que se ejecute cuando 'show' cambie

    return (
        <Modal show={show} onClose={onClose}>
            <h3 className="text-lg font-medium">Notificaciones</h3>
            {notifications.length === 0 ? (
                <p>No hay notificaciones</p>
            ) : (
                notifications.map((notification) => {
                    const data = JSON.parse(notification.data);
                    return (
                        <div key={notification.id} className="py-2">
                            <p>{data.message}</p>
                            <p>Monto de la donación: {data.donation_amount}</p>
                            <p>Título de la campaña: {data.campaign_title}</p>
                        </div>
                    );
                })
            )}
        </Modal>
    );
};

export default Notifications;

