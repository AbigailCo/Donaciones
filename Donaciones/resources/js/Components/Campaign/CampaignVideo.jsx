import React from 'react';
import { Box, Typography } from '@mui/material';

const CampaignVideo = ({ youtubeId }) => {
    return (
        <Box
            sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 Aspect Ratio
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f5f5f5', // Fondo claro para el contenedor
                mb: 4,
            }}
        >
            {youtubeId ? (
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    frameBorder="0"
                    allowFullScreen
                    title="YouTube Video"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '8px',
                    }}
                ></iframe>
            ) : (
                <Typography variant="h6" align="center" color="text.secondary" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    Esta campaña no posee ningún video.
                </Typography>
            )}
        </Box>
    );
};

export default CampaignVideo;
