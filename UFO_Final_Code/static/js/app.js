// from data.js
var uniqueDate;
var tableData = data;
let dateContact;

// YOUR CODE HERE!
// ***  data for filters ****
function dateFilter(){
// reserv "All"	for alll dates in the data
	var dates = ["All"];
// retrive arrey of unic datetime values from tableDate
	var AllDates = Array.from(new Set(tableData.map(contact => contact.datetime))).sort();
// concatenate dates to "All" 
	dates = dates.concat(AllDates);
// create drop down select element for Date on HTML and set handler  doFilterD3() for "onChange" event
	var select = d3.select('#dateFilter>label').append('select').attr('class','selectDate')
	.attr("id", "filtDate").on('change',doFilterD3);
// assigne date from "dates" to the select options 
	select.selectAll('option').data(dates).enter().append('option').text(function (d) { return d; });
}

function cityFilter(){
	var cities = ["All"];
	var AllCities = Array.from(new Set(tableData.map(contact => contact.city))).sort();
	cities = cities.concat(toCapsFirst(AllCities, "city"));
	var select = d3.select('#cityFilter>label').append('select').attr('class','select')
	.attr("id", "filtCity").on('change',doFilterD3);
	select.selectAll('option').data(cities).enter().append('option').text(function (d) { return d; });
}

function stateFilter(){
	var states = ["All"];
	var AllStates = Array.from(new Set(tableData.map(contact => contact.state))).sort();
	states = states.concat(AllStates.map(function(st){ return st.toUpperCase() }));
	var select = d3.select('#stateFilter>label').append('select').attr('class','select')
	.attr("id", "filtState").on('change',doFilterD3);
	select.selectAll('option').data(states).enter().append('option').text(function (d) { return d; });
}

function countryFilter(){
	var countries = ["All"];
	var AllCountries = Array.from(new Set(tableData.map(contact => contact.country))).sort();
	countries = countries.concat(AllCountries.map(function(ct){ return ct.toUpperCase() }));
	var select = d3.select('#countryFilter>label').append('select').attr('class','select')
	.attr("id", "filtCountry").on('change',doFilterD3);
	select.selectAll('option').data(countries).enter().append('option').text(function (d) { return d; });
}

function shapeFilter(){
	var shapes = ["All"];
	var AllShapes = Array.from(new Set(tableData.map(contact => contact.shape))).sort();
	shapes = shapes.concat(toCapsFirst(AllShapes, "shape"));
	var select = d3.select('#shapeFilter>label').append('select').attr('class','select')
	.attr("id", "filtShape").on('change',doFilterD3);
	select.selectAll('option').data(shapes).enter().append('option').text(function (d) { return d; });
}

// chet it first 
// https://medium.freecodecamp.org/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27
function toCapsFirst(ds, column){
	return ds.map(function(ct){return ct.toLowerCase().split(' ').map(function(column) {
			return (column.charAt(0).toUpperCase() + column.slice(1));
	}).join(' ')})
}
// ***  end of data for filters ****

// *** put data from tableData to the HTML table
function putData() {
// Get a reference to the table body
	var tbody = d3.select("tbody");
 // Use d3 to update each cell's text with
 // a data from tableDate
 // Going through all data
	tableData.forEach(function(ufoData) {
// ufoData - it's a one object in tableData which will put in the row
// add new row into the table 
	  var row = tbody.append("tr");
// go through all elements in the object: datetime, city, state,...
	  Object.entries(ufoData).forEach(function([key, value]) {
//   datetime: "1/1/2010" -> key:datetime, value:"1/1/2010"
		if (key == "city" || key == "shape") {
			value = value.split(' ').map(function(name) {
						return (name.charAt(0).toUpperCase() + name.slice(1));
					}).join(' ');
		}
		if (key == "state" || key == "country") {
			value = value.toUpperCase();
		}
	 // Append a cell to the row for each value
	 // in the ufo data report
		var cell = row.append("td");
		cell.text(value);
	  });
	});
}
 
function doFilterD3() {
//	clean table to prepare for filtered data
	d3.selectAll("tbody>tr").remove();
	
	var contactDate = d3.select("#filtDate").property('value').toLowerCase();
	if (contactDate == "all") {
		tableData = data;
	} else {
		// extract only data with corresponded contactDate in datetime
		tableData = data.filter(contact => contact.datetime == contactDate);
	}
	var contactCity = d3.select("#filtCity").property('value').toLowerCase();
	if (contactCity != "all") { // do not filter for "any" city
		tableData = tableData.filter(contact => contact.city == contactCity);
	}
	var contactState = d3.select("#filtState").property('value').toLowerCase();
	if (contactState != "all") {
		tableData = tableData.filter(contact => contact.state == contactState);
	}
	var contactCountry = d3.select("#filtCountry").property('value').toLowerCase();
	if (contactCountry != "all") {
		tableData = tableData.filter(contact => contact.country == contactCountry);
	}
	var contactShape = d3.select("#filtShape").property('value').toLowerCase();
	if (contactShape != "all") {
		tableData = tableData.filter(contact => contact.shape == contactShape);
	}
	// refresh table with modified "tableData"
	putData();
}