const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const path = require('path');
const port = 5000;

// Enable Cross-Origin Requests from frontend
app.use(require('cors')());

// Middleware to serve static files (like the HTML form)
// app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to download video
app.get('/download', async (req, res) => {
    const { url } = req.query;

    if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

        res.header('Content-Disposition', 'attachment; filename="video.mp4"');
        ytdl(url, { format: format }).pipe(res);
    } catch (error) {
        res.status(500).json({ error: 'Failed to download video' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
