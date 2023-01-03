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
  res.sendFile(path.join(__dirname, "../public") + '/index.html');
});

app.post('/createTicket', async (req, res) => {
  console.log(req.body);
  console.log("test click");

  var options = {
    url: 'https://dev122250.service-now.com/api/now/table/incident',
    method: 'POST',
    headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer("admin:8D-FiiP5-lZm").toString('base64')) },
    json: true,
    data: { 'short_description': "Ticket from MIT", 'description': 'Creating incident through Request', 'assignment_group': '', 'urgency': '2', 'impact': '2', "severity": "2" }
  };
  const response = await axios(options)
  
  console.log(response);
  let loc = response.headers.location
  //console.log(loc);
  let locArr = loc.split("/")
  let id = locArr[locArr.length - 1]
  console.log("ID in server:",id);
  res.send({
    "id": id
  });
})

app.post("/getTicketInfo", async (req, res) => {
  let ticketID = req.body.id
  const response = await fetch(`https://dev122250.service-now.com/api/now/table/incident?sysparm_display_value=all&sys_id=${ticketID}`,
    { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer("admin:8D-FiiP5-lZm").toString('base64')) } }
  )

  let txt = await response.text()
  let jsnDT = JSON.parse(txt);
  console.log("json",jsnDT);
  console.log("Comments: ",jsnDT.result[0]["comments"]["display_value"]);
  let arr= jsnDT.result[0]["comments"]["display_value"].split("\n")
  console.log("split message:",arr);
  let message_arr=[]
  let temp=[]
    arr.forEach(item => {
      if(item==""){
        if(temp[0]!= undefined){
          message_arr.push({date:temp[0].split(" - ")[0].split(" ")[0],time:temp[0].split(" - ")[0].split(" ")[1],author:temp[0].split(" - ")[1].split(" (")[0],message:temp.slice(1,temp.length),msg_type:temp[0].split(" - ")[1].split(" (")[1].replace(")","")})
          temp=[]
        }
        
      }else{
        temp.push(item)
      }
    });

    console.log("message arr:",message_arr);
  
  // res.send({
  //   "messages": id
  // });
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