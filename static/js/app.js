// Homework Wk 14 | 11 - JavaScript Homework
// UofMN Data Visualization and Analytics Bootcamp
// Created By: Chris Howard
// Date: 06/08/2019

// from data.js
var tableData = data;

// Capitalize first letter of each word in a string
function capital(str) {
    var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

// Create table using full or filtered object
function createTable(ufoData) {
    var table = d3.select("#ufo-table");
    var tbody = table.select("tbody");
    var trow;
    ufoData.forEach((data) => {
        trow = tbody.append("tr");
        trow.append("td").text(data.datetime);
        trow.append("td").text(capital(data.city));
        trow.append("td").text(data.state.toUpperCase());
        trow.append("td").text(data.country.toUpperCase());
        trow.append("td").text(data.shape);
        trow.append("td").text(data.durationMinutes);
        trow.append("td").text(data.comments);
    });
    
};

// Create initial table 
createTable(tableData);

var submit = d3.select("#filter-btn");

// Filter data file and re-create table when filter button is clicked
submit.on("click", function() {
    d3.event.preventDefault();

    d3.select("#ufo-table").selectAll('td').remove();

    filterData = tableData;

    var filterDate = d3.select("#datetime").property("value");
    if (filterDate != "") {
        filterData = filterData.filter(sighting => sighting.datetime === filterDate);
    };
    
    var filterCity = d3.select("#city").property("value");
    if (filterCity != "") {
        filterData = filterData.filter(sighting => sighting.city === filterCity.toLowerCase());
    };

    var filterState = d3.select("#state").property("value");
    if (filterState != "") {
        filterData = filterData.filter(sighting => sighting.state === filterState.toLowerCase());
    };

    var filterCountry = d3.select("#country").property("value");
    if (filterCountry != "") {
        filterData = filterData.filter(sighting => sighting.country === filterCountry.toLowerCase());    
    };

    var filterShape = d3.select("#shape").property("value");
    if (filterShape != "") {
        filterData = filterData.filter(sighting => sighting.shape === filterShape.toLowerCase());
    };    

    createTable(filterData);
    
});

