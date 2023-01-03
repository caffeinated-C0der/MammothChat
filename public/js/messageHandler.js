let count = 0
let message_log = null
let socket = io(),
    messages = document.getElementById('messages'),
    form = document.getElementById('form'),
    input = document.getElementById('input'),
    name = prompt("Who are you?");

socket.emit('chat message', name + " has joined the chat");

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (input.value) {

        if (count == 0) {
            console.log("Before");
            let response = await createTicket(input.value)
            console.log("After");
            console.log("res:", response);
            const resObj = await response.json();
            console.log("resObj:", resObj);
            console.log("ID:::::::::::::::::::::::::::", resObj.id);
            
            // var intervalId = 
            window.setInterval(async ()=>{await getTicketInfo(resObj.id)},30000)
            //clearInterval(intervalId)// to stop loop
            console.log("After intervals");
                        
        }
        socket.emit('chat message', input.value);
        input.value = '';
        count++
    }
});


socket.on('chat message', function (msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    console.log(item);
    window.scrollTo(0, document.body.scrollHeight);
});

async function createTicket(msg) {
    console.log("Triggered");
    let res = {
        description: msg
    }

    const response = await fetch('/createTicket', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res)
    })

    return response
}

async function getTicketInfo(ticketID) {
    console.log("GET");
    let res = {
        id: ticketID
    }

    await fetch('/getTicketInfo', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(res)
    })
}