
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

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

http.listen(PORT, () => {
    console.log('[LISTENING] Connected and listening on post '+PORT)
});
