const WebSocket = require('ws');
const http = require('http');
const fs = require ('fs');
var httpServer = http.createServer(function (request, response) {
  console.log('http client connected');

  fs.readFile('./index.html', function(error, content) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(content);
  });
});

const ws = new WebSocket.Server({
  server: httpServer
});

var connections = [];

ws.on('connection', function connection(ws, request) {
    console.log("websocket client connected");
    connections.push(ws); // saves reference to every connection in the connections array
    ws.on("message", function incoming(message) {
        console.log("received: %s", message);
        connections.forEach(function (connection){
          connection.send(message.toUpperCase()+"!!!");
        });
    });
    ws.on("close", function close() {
        console.log("Connection closed");
    });
});

httpServer.listen(8001, "0.0.0.0", function listening() {
console.log('Listening on %d', httpServer.address().port);
});


