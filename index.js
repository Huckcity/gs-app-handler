
var express = require('express');

var app = express();

app.use(express.json());

var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {

    io.emit('hello', req.body);

    console.log(req.headers) // Call your action on the request here
    console.log(req.body) // Call your action on the request here
    res.send('root')
    res.status(200).end() // Responding is important

});


io.on('connection', (socket) => {
    console.log('a user connected');
});

http.listen(3000, 'droplet_IP');