import React from 'react';

const CampaignVideo = ({ youtubeId }) => {
    

    return (
        <div>
            {youtubeId ? (
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    frameBorder="0"
                    allowFullScreen
                    title="YouTube Video"
                ></iframe>
            ) : (
                <p>No video available.</p>
            )}
        </div>
    );
};

export default CampaignVideo;
