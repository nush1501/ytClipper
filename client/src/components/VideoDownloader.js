import React, { useState } from 'react';
import axios from 'axios';

const VideoDownloader = () => {
    const [url, setUrl] = useState('');
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const response = await axios.get('http://localhost:5000/download', {
                params: { url },
                responseType: 'blob',
            });

            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'video.mp4');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading video:', error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div>
            <h2>Download YouTube Video</h2>
            <input
                type="text"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleDownload} disabled={isDownloading}>
                {isDownloading ? 'Downloading...' : 'Download'}
            </button>
        </div>
    );
};

export default VideoDownloader;
