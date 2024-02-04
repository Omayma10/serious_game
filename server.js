const express = require('express');
const { WebSocketServer } = require('ws');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (data) => {
      // Convert data to string if it isn't already one
      const message = data.toString();

      // Broadcast the received message to all clients except the sender
      wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === ws.OPEN) {
              client.send(message);
          }
      });
  });
});
