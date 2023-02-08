/*********************************************************************
    Required modules and variables
*/
const fs                = require('fs');
const webSocket         = require('ws');
const crypto            = require('crypto');
const connections       = new Map();


/*********************************************************************
    get_hash()    
*/
function get_hash() {
    const epochTime     = Date.now();
    const randomNumber  = Math.random();
    const hash          = crypto.createHash('sha512');
    hash.update(epochTime + '' + randomNumber);
    return hash.digest('hex');
}


/*********************************************************************
    tx()   
    Transmit data to client.
*/
function tx(ws, dataToSend) {
    ws.send(dataToSend);
}


/*********************************************************************
    cmd_updateQueue()
    Moves all clients up a spot in the queue.
*/
function cmd_updateQueue() {
    try {
        for(let [key, value] of connections.entries()) {
            let connection = [];
            console.log('*********** ' + value);
            connection = value;
            connection[6] = (connection[6] -= 1);
            console.log(connection[6]);
            connections.set(key,connection);
            //console.log(`Connections queue updated`);
        }
    } catch(error) {
        console.log(`There was some kind of error cmd_updateQueue ${error}`);
    } finally {
        console.log(`Connections in queue: ${connections.size}`);
        console.log(connections);
    }
}



/*********************************************************************
    cmd_connectionClose()   
    Close web socket connection.
*/
function cmd_connectionClose(ws) {
    ws.close();
}


/*********************************************************************
    event_join()    
*/
function event_join(id, ws, dataReceived) {
    connections.set(id, [
        id, // Unique chat id
        ws, // web socket information
        dataReceived.subject,
        dataReceived.description,
        dataReceived.first_name, 
        dataReceived.last_name, 
        dataReceived.positionInQueue + 1
    ]);

    const payload_join = JSON.stringify({
        event: "NOTICE",
        payload: {
            chat_id:            id,
            email:              dataReceived.email,
            subject:            dataReceived.subject,
            description:        dataReceived.description,
            first_name:         dataReceived.first_name,
            last_name:          dataReceived.last_name,
            positionInQueue:    connections.size
        }
    });
    ws.send(payload_join);
}


/*********************************************************************
    [STARTUP]
    Not really needed for now
*/
function cmd_startup() {
    console.log('[STARTUP]')
    try {
        // s2
        fs.readdirSync(__dirname + '../chats/unprocessed').forEach(file => {
            // s3
            fs.readFile(__dirname + '../chats/unprocessed/' + file, (err, data) => {
                // s4
                // s5
                // s6
                if (err) throw err;
                let student = JSON.parse(data);
                console.log(student);
            });
        });
    } catch {
        console.log('There was a problem');
    }
}
cmd_startup();


/*********************************************************************
    s7
    Start listening for incomming connections
*/
const wss = new webSocket.Server({ port: 17152 });
console.log('Server listing for new connections');


// s8 - Server accepts new socket connection
wss.on('connection', (ws) => {
    // s9 - Generate unique ID
    const id = get_hash();

    // s10 - Check if chat ID is Unique
    while(connections.has(id)) {
        console.log(`ID: ${id} already in use, generating new ID`);
        id = get_hash();
    }
    console.log(`Client connected id: ${id}`);

    // s11 - Get connections size, for setting queue position
    let connectionSize = connections.size;

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        let event = data.event;
        let dataReceived = data.payload;

        switch(event) {
            case 'JOIN':
                event_join(id, ws, dataReceived);
                break;

            default:
                ws.send(JSON.stringify({
                    message: 'Unknown event'
                }));
        }

        console.log(`Connections in queue: ${connections.size}`);

    });
    

    ws.on('close', () => {
        try {
            for(let [key, value] of connections.entries()) {
                if(ws === value[1]) {
                    connections.delete(key);
                    console.log(`Client clossed the connection id: ${key}`);
                }
            }
        } catch(error) {
            console.log(`There was some kind of error`);
        } finally {
            console.log(`Connections in queue: ${connections.size}`);
            cmd_updateQueue();
        }
    });
});
