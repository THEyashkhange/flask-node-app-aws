
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const BACKEND_URL =
    process.env.BACKEND_URL || 'http://127.0.0.1:5000';

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Forward browser requests to Flask
app.post('/api/submit', async (req, res) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const result = await response.json();
        res.status(response.status).json(result);
    } catch (error) {
        console.error('Flask backend connection failed:', error.message);

        res.status(502).json({
            status: 'error',
            message: 'Node.js could not connect to the Flask backend.'
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend server running on port ${PORT}`);
});
