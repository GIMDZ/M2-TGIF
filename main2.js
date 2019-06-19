//Datos para fetch de Senate 

var initS = {
  method: 'GET',
  headers: {
    'X-API-Key': 'D5hivcA0RzY6OnHzTlkfX2EiUILLXVLhAQmBwQIk'
  }
};

var data = [];

fetchJson(url, initS).then(function (json) {
  console.log(json.results[0].members);
  data = json;
  app.members = json.results[0].members;
  app.membersFiltrados = json.results[0].members;

}).catch(function (error) {
  alert('Error en data')
});

function fetchJson(url, init) {
  return fetch(url, init).then(function (response) {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  });
}

//Llama a la función createTable dependiendo de la data.
/*function verifyType() {

  if (document.getElementById("senate-table")) {
    createTable("senate-table", filterTable(data.results[0].members));
  } else {
    createTable("house-table", filterTable(data.results[0].members));
  }
}*/

//Vue

var app = new Vue({
  el: '#app',
  data: {
    members: [],
    states: [],
    membersFiltrados: []
  },
  methods: {
    filter: function () {
      var filters = [];

      //Item seleccionado del menú de estados.
      var selectedState = document.getElementById("select-states").value;

      for (var i = 0; i < this.members.length; i++) {
        memberState = this.members[i].state;

        // Si checkbox verdadero, comprueba si hay algún estado seleccionado y la compara, después copia el elemento en el array "filters".

        if ((selectedState === "All" || selectedState === memberState) && (document.getElementById("check-independent").checked === true)) {
          if (this.members[i].party === "I") {
            filters.push(this.members[i]);
          }
        }
        if ((selectedState === "All" || selectedState === memberState) && (document.getElementById("check-republican").checked === true)) {
          if (this.members[i].party === "R") {
            filters.push(this.members[i]);
          }
        }
        if ((selectedState === "All" || selectedState === memberState) && (document.getElementById("check-democrat").checked === true)) {
          if (this.members[i].party === "D") {
            filters.push(this.members[i]);
          }
        }

      }

      this.membersFiltrados = filters;
    }

  }
});

// Crea la tabla con los elementos de la función addTableToHTML

/*function createTable(id, data) {

  // Busco el elemento que tiene el id "senate-data" (tabla) y le pido que lo aloje en la variable "elSenateTable".
  var elSenateTable = document.getElementById(id);
  // Copio el contenido del array "members" en la variable tableElement.
  tableElement = addTableToHTML(data);
  //Actualizo el contenido de la tabla en el HTML
  elSenateTable.innerHTML = tableElement;
}

// Recorre el array y crea el head y el body de la tabla.
function addTableToHTML(membersArray) {

  // Variable con encabezado de la tabla
  var tablaHTML = '<thead class="thead-dark"><tr><th> Name </th><th> Party Affiliation</th><th> State </th><th> Seniority </th><th> Percentage of votes with party </th></tr></thead>';

  // Se agrega <tbody> 
  tablaHTML += '<tbody>';

  // Itera "members" agregando <tr> y <td>.
  membersArray.forEach(function (member) {
    tablaHTML += '<tr>';
    if (member.middle_name === null) { // Si no tiene segundo nombre, solo agrega nombre y apellido.
      tablaHTML += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.last_name + '</td>';
    } else { // De lo contrario, nombre, segundo nombre y apellido.
      tablaHTML += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.middle_name + ' ' + member.last_name + '</a></td>';
    }
    tablaHTML += '<td>' + member.party + '</td>';
    tablaHTML += '<td>' + member.state + '</td>';
    // addToDropDown(member.state);
    tablaHTML += '<td>' + member.seniority + '</td>';
    tablaHTML += '<td>' + member.votes_with_party_pct + ' % </td>';
    tablaHTML += '</tr>';
  });

  tablaHTML += '</tbody>';

  return tablaHTML;
}

function filterTable(members) {

  var filters = [];

  //Item seleccionado del menú de estados.
  var selectedState = document.getElementById("select-states").value;

  for (var i = 0; i < members.length; i++) {
    memberState = members[i].state;

    // Si checkbox verdadero, comprueba si hay algún estado seleccionado y la compara, después copia el elemento en el array "filters".

    if ((selectedState === "All" || selectedState === memberState) && (document.getElementById("check-independent").checked === true)) {
      if (members[i].party === "I") {
        filters.push(members[i]);
      }
    }
    if ((selectedState === "All" || selectedState === memberState) && (document.getElementById("check-republican").checked === true)) {
      if (members[i].party === "R") {
        filters.push(members[i]);
      }
    }
    if ((selectedState === "All" || selectedState === memberState) && (document.getElementById("check-democrat").checked === true)) {
      if (members[i].party === "D") {
        filters.push(members[i]);
      }
    }

  }
  return filters;

}*/