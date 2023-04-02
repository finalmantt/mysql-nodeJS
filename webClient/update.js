const txtid = document.getElementById("myID");
const txtname = document.getElementById("myName");
const txtemail = document.getElementById("myEmail");

var para = new URLSearchParams(window.location.search);
var pass = para.get("id");
console.log(pass);

async function funcName(url) {
  const response = await fetch(url);
  var data = await response.json();
  txtid.innerText = data[0]["id"];
  txtname.innerText = data[0]["name"];
  txtemail.innerText = data[0]["email"];
  console.log(data);
}
funcName("http://127.0.0.1:3000/read/" + pass);
