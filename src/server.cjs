const axios = require('axios')
const express = require('express');
const http = require('http');
const path = require('path')

const app = express();
app.use(express.static(path.join(__dirname, "../public")));
var router = express.Router()
app.use('/', router)
app.use(express.json())

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"../public") + '/index.html');
});

app.post('/createTicket', async (req, res)=>{
  console.log(req.body);
  console.log("test click");
  var options = {
    url: 'https://dev122250.service-now.com/api/now/table/incident',
    method: 'POST',
    headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer("admin:8D-FiiP5-lZm").toString('base64')) },
    json: true,
    data: { 'short_description': "testing this things 2", 'description': 'Creating incident through Request', 'assignment_group': 'bf1d96e3c0a801640190725e63f8ac80', 'urgency': '2', 'impact': '2', "severity": "2" }

  };

  const response = await axios(options)
  console.log(response);
  let loc = response.headers.location
  console.log(loc);
  let locArr = loc.split("/")
  let id = locArr[locArr.length - 1]
})


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ', msg);
    io.emit('chat message', msg);
  });
});


server.listen(3000, () => {
    console.log('Listening on *: 3000');
});