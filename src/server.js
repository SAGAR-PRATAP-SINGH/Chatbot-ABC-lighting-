const express = require('express');
const path = require('path');
const chatService = require('./services/chatService');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/assets', express.static(path.join(__dirname, '../public/assets'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.jpg')) {
            res.set('Content-Type', 'image/jpeg');
        } else if (path.endsWith('.png')) {
            res.set('Content-Type', 'image/png');
        }
    }
}));

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Chat endpoint
app.post('/chat', async (req, res) => {
    try {
        const requestData = Array.isArray(req.body) ? req.body[0] : req.body;
        const { message, conversationHistory } = requestData;
        const response = await chatService.processMessage(message, conversationHistory);
        res.json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            response: "Sorry, I encountered an error.",
            followUp: "Would you like to try again?"
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});