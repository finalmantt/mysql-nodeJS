async function selectALL(url) {
  const response = await fetch(url);
  var data = await response.json();

  ///show data
  const myInfo = document.getElementById("myInfo");
  myInfo.innerText =
    data[0]["id"] + " " + data[0]["name"] + " " + data[0]["email"];
  //   txtemail.innerText = data[0]["email"];
  console.log(data);
}
selectALL("http://127.0.0.1:3000/read/");

async function selectData() {
  const selectID = document.getElementById("selectID");

  const response = await fetch("http://127.0.0.1:3000/read/" + selectID.value);
  var data = await response.json();

  ///show data
  const myInfo = document.getElementById("myInfo");
  myInfo.innerText =
    data[0]["id"] + " " + data[0]["name"] + " " + data[0]["email"];
  console.log(data);
}

async function insertData() {
  const sid = document.getElementById("insertID");
  const sname = document.getElementById("insertName");
  const semail = document.getElementById("insertEmail");

  url = "http://127.0.0.1:3000/create/";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body:
      '{ "id": ' +
      sid.value +
      ', "name": "' +
      sname.value +
      '", "email": "' +
      semail.value +
      '" }',
  });
  var data = await response.json();

  console.log(data);
  location.reload();
}

async function updateData() {
  const sid = document.getElementById("updateID");
  const sname = document.getElementById("updateName");
  const semail = document.getElementById("updateEmail");

  url = "http://127.0.0.1:3000/update/" + sid.value;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: '{  "name": "' + sname.value + '", "email": "' + semail.value + '" }',
  });
  var data = await response.json();

  console.log(data);
  location.reload();
}

async function deleteData() {
  const myInput = document.getElementById("deleteID");

  url = "http://127.0.0.1:3000/delete/" + myInput.value;
  const response = await fetch(url, { method: "DELETE" });
  var data = await response.json();

  console.log(data);
  location.reload();
}

async function funcTable(url) {
  const response = await fetch(url);
  var data = await response.json();
  var cols = [];

  // get colums
  for (var i = 0; i < data.length; i++) {
    for (var k in data[i]) {
      if (cols.indexOf(k) === -1) {
        cols.push(k);
      }
    }
  }
  console.log("here", cols);

  // Create a table element
  var table = document.createElement("table");

  // Create table row tr element of a table
  var tr = table.insertRow(-1);

  for (var i = 0; i < cols.length; i++) {
    // Create the table header th element
    var theader = document.createElement("th");
    theader.innerHTML = cols[i];

    // Append columnName to the table row
    tr.appendChild(theader);
  }
  // Append columnName to the table row
  var theader = document.createElement("th");
  theader.innerHTML = "Edit";
  tr.appendChild(theader);

  // Adding the data to the table
  for (var i = 0; i < data.length; i++) {
    // Create a new row
    trow = table.insertRow(-1);
    for (var j = 0; j < cols.length; j++) {
      var cell = trow.insertCell(-1);

      // Inserting the cell at particular place
      cell.innerHTML = data[i][cols[j]];
    }
    var cell = trow.insertCell(-1);
    cell.innerHTML += `<a href="show.html?id=${data[i][cols[0]]}">Show</a>`;
  }

  // Add the newly created table containing json data
  var el = document.getElementById("myTable");
  el.innerHTML = "";
  el.appendChild(table);
}
funcTable("http://127.0.0.1:3000/read/");
