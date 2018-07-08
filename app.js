var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/logging', function (req, res) {
  console.log('logging');
  res.sendFile(__dirname + '/public/html/logging.html');
});

app.get('/*', function (req, res) {
  console.log('Gotcha!');
  var message = {
    "method": req.method,
    "url": req.url,
    "headers": req.headers,
    "body": req.body
  };
  io.emit('message', message);
  //res.sendFile(__dirname + '/public/html/index.html');
});

io.on('connection', function (socket) {
  console.log('a client connected');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
