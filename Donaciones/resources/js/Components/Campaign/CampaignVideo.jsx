import React from 'react';
import { Box, Typography } from '@mui/material';

const CampaignVideo = ({ youtubeId }) => {
    if (!youtubeId) {
        return null; // Si no hay YouTube ID, no renderiza el componente
    }

    return (
        <Box
            sx={{
                position: 'relative',
                paddingTop: '56.25%', // 16:9 Aspect Ratio
                overflow: 'hidden',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f5f5f5',
                mb: 4,
            }}
        >
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
        </Box>
    );
};

export default CampaignVideo;

