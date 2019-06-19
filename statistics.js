var statistics = {
	"number_of_democrats": 0,
	"number_of_republicans": 0,
	"number_of_independents": 0,
	"total": 0,
	"democrats_average_votes_with_party": 0,
	"republicans_average_votes_with_party": 0,
	"independents_average_votes_with_party": 0,
	"total_average": 0,
	"least_engaged": [],
	"most_engaged": [],
	"least_loyal": [],
	"most_loyal": []
};

var init = {
	method: 'GET',
	headers: {
		'X-API-Key': 'D5hivcA0RzY6OnHzTlkfX2EiUILLXVLhAQmBwQIk'
	}
};

fetchJson(url, init).then(function (json) {
	data = json;
	app.statistics = makeStatistics(json.results[0].members, statistics);

}).catch(function (error) {
	alert('Error en data')
});

function fetchJson(url, init) {
	return fetch(url, init).then(function (response) {
		if (response.ok) {
			return response.json();
		}
		/* 		throw new Error(response.statusText);
		 */
	});
}

function makeStatistics(members, objectStatistics) {

	let democratsArray = filtrarPorPartido(members, "D");
	statistics.number_of_democrats = democratsArray.length;
	statistics.democrats_average_votes_with_party = mediaVotos(democratsArray);

	let republicansArray = filtrarPorPartido(members, "R");
	statistics.number_of_republicans = republicansArray.length;
	statistics.republicans_average_votes_with_party = mediaVotos(republicansArray);

	let independentsArray = filtrarPorPartido(members, "I");
	statistics.number_of_independents = independentsArray.length;
	statistics.independents_average_votes_with_party = mediaVotos(independentsArray);

	statistics.total = democratsArray.length + republicansArray.length + independentsArray.length;
	statistics.total_average = mediaVotos(members);


	objectStatistics.least_engaged = genArrayEngaged(false, members);
	objectStatistics.most_engaged = genArrayEngaged(true, members);
	objectStatistics.least_loyal = genArrayLoyal(false, members);
	objectStatistics.most_loyal = genArrayLoyal(true, members);

	return objectStatistics;
};

//Declaro variable global tomando array members del json

//var members = data.results[0].members;

//At Glance function tomado de mentores

var app = new Vue({
	el: "#app",
	data: {
		statistics: {}
	}
})


function filtrarPorPartido(arrayOriginal, partido) {
	let arrayPartido = [];
	arrayPartido = arrayOriginal.filter(member => member.party == partido);
	return arrayPartido;
}

function mediaVotos(arrayPartido) {
	let media = Math.round(sumatoriaDeVotos(arrayPartido) / arrayPartido.length * 100) / 100 || 0;
	return media;
}

function sumatoriaDeVotos(array) {
	sumatoria = array.reduce((sum, member) => sum + member.votes_with_party_pct, 0)
	return sumatoria;
}

//Loyalty & Attendance functions

function genArrayLoyal(asc, members) {
	var max = Math.round(members.length * 10) / 100;
	var membersOrdenados = [];

	members.sort((a, b) => asc ? b.votes_with_party_pct - a.votes_with_party_pct : a.votes_with_party_pct - b.votes_with_party_pct);
	var i = 0;

	while (i < max || members[i].votes_with_party_pct == members[i - 1].votes_with_party_pct) {
		membersOrdenados.push(members[i]);
		i++;
	}

	return membersOrdenados;
}

function genArrayEngaged(asc, members) {
	var max = Math.round(members.length * 10) / 100;
	var membersOrdenados = [];

	members.sort((a, b) => asc ? b.missed_votes_pct - a.missed_votes_pct : a.missed_votes_pct - b.missed_votes_pct);

	var i = 0;

	while (i < max || members[i].missed_votes_pct == members[i - 1].missed_votes_pct) {
		membersOrdenados.push(members[i]);
		i++;
	}

	return membersOrdenados;

}

//Se completa el json de statistics

/* statistics["most_loyal"] = genArrayLoyal(true);
statistics["most_engaged"] = genArrayEngaged(true);
statistics["least_loyal"] = genArrayLoyal(false);
statistics["least_engaged"] = genArrayEngaged(false);

var glance = document.getElementById("glance");
var most = document.getElementById("most");
var least = document.getElementById("least"); */

//Se crean las tablas

/*createGlanceTable(glance);

function createGlanceTable(table) {
	var row = table.insertRow();
	row.className = "rowBody";
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	cell1.innerHTML = "Democrats";
	cell2.innerHTML = statistics.number_of_democrats;
	cell3.innerHTML = statistics.democrats_average_votes_with_party;

	var row2 = table.insertRow();
	row.className = "rowBody";
	cell4 = row2.insertCell(0);
	cell5 = row2.insertCell(1);
	cell6 = row2.insertCell(2);
	cell4.innerHTML = "Republicans";
	cell5.innerHTML = statistics.number_of_republicans;
	cell6.innerHTML = statistics.republicans_average_votes_with_party;

	var row3 = table.insertRow();
	row.className = "rowBody";
	cell7 = row3.insertCell(0);
	cell8 = row3.insertCell(1);
	cell9 = row3.insertCell(2);
	cell7.innerHTML = "Independents";
	cell8.innerHTML = statistics.number_of_independents;
	cell9.innerHTML = statistics.independents_average_votes_with_party;


	var row4 = table.insertRow();
	row.className = "rowBody";
	cell10 = row4.insertCell(0);
	cell11 = row4.insertCell(1);
	cell12 = row4.insertCell(2);
	cell10.innerHTML = "Total";
	cell11.innerHTML = statistics.total;
	cell12.innerHTML = statistics.total_average;
}


//Tablas loyalty y attendance

function createRowsTable(tabla, members, key, key1, page) {

	members.forEach(function (element) {


		var row = tabla.insertRow();
		row.className = "rowBody";
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);

		var independents = ""
		if (element.independents == null) { //Muestra un espacio si no hay valores
			middle = " ";
		} else {
			middle = element.independents;
		}
		cell1.innerHTML = cell1.innerHTML = ("<a href=" + element.url + ">" + element.first_name + " " + middle + " " + element.last_name + "</a>");
		cell3.innerHTML = (element[key]);
		page ? cell2.innerHTML = (element[key1] - element.missed_votes) : cell2.innerHTML = (element[key1])

	})*/