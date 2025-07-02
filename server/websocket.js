const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    switch(data.type) {
      case 'user_connected':
        clients.set(data.user.username, ws);
        broadcastUserStatus(data.user.username, 'online');
        break;
      
      case 'message':
        broadcast(message);
        break;
      
      case 'typing':
        broadcast(message);
        break;
    }
  });

  ws.on('close', () => {
    let disconnectedUser;
    clients.forEach((client, username) => {
      if (client === ws) {
        disconnectedUser = username;
        clients.delete(username);
      }
    });
    if (disconnectedUser) {
      broadcastUserStatus(disconnectedUser, 'offline');
    }
  });
});

function broadcast(message) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function broadcastUserStatus(username, status) {
  const statusMessage = JSON.stringify({
    type: 'user_status',
    user: username,
    status: status
  });
  broadcast(statusMessage);
}

console.log('WebSocket server running on port 8080');