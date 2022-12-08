// import axios from "axios"

document.getElementById("open").addEventListener("click",()=>{openForm(),howl()})
document.getElementById("close").addEventListener("click",()=>{closeForm()})

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function howl() {
  var audio = new Audio('../assets/audio/Chewbacca_Sound_6.mp3');
  audio.volume = 0.17
  audio.play();
}

// async function sendy() {
//   console.log("test click");
//   var options = {

//     url: 'https://dev122250.service-now.com/api/now/table/incident',

//     method: 'POST',

//     headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer("admin:8D-FiiP5-lZm").toString('base64')) },

//     json: true,

//     data: { 'short_description': "testing this things 2", 'description': 'Creating incident through Request', 'assignment_group': 'bf1d96e3c0a801640190725e63f8ac80', 'urgency': '2', 'impact': '2', "severity": "2" }

//   };

//   const response = await axios(options)
//   console.log(response);
//   let loc = response.headers.location
//   console.log(loc);
//   let locArr = loc.split("/")
//   let id = locArr[locArr.length - 1]
//   console.log(id);
//   return id
// }

// async function getStuff(ticketID) {
//   console.log("in here" + ticketID);

//   // let response = await fetch(`https://dev122250.service-now.com/api/sn_ind_tsm_sdwan/troubleticket/incident/fa8a213297631110dbfb33121153afa7?fields=name%2Cdescription%2Cseverity%2Cstatus`, {
//   //   headers: {
//   //     'Accept': 'application/json',
//   //     'Authorization': "Basic " + new Buffer("admin:8D-FiiP5-lZm").toString('base64')
//   //   }
//   // });
//   const response = await fetch(`https://dev122250.service-now.com/api/now/table/incident?sysparm_display_value=all&sys_id=349279f697631110dbfb33121153af25`,

//     { headers: { "Accept": "application/json", "Content-Type": "application/json", "Authorization": ("Basic " + new Buffer("admin:8D-FiiP5-lZm").toString('base64')) } }
//   )
//   let txt = await response.text()
//   let jsnDT=JSON.parse(txt);
//   console.log(jsnDT.result[0]["comments"]["display_value"]);
//   // console.log(response);
// }

// let id = await sendy()
// await getStuff(id)

export {openForm,closeForm,howl}



