
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Notifications({ show, onClose }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (show) {
            axios.get('/api/notifications')
                .then((response) => {
                    setNotifications(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching notifications: ", error);
                });
        }
    }, [show]);

    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Notifications</h2>
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.id}>{notification.message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
