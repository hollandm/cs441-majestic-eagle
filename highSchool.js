/**
 * highSchool.js
 *
 * This file contains code to fetch and store the high school data. 
 *  
 * @author Matt Holland and Taylor W. Nightingale
 * @since October 27th, 2013
 */

var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

cs441GoogleMapsViz.highShool = {};

/**
 * highSchool
 *
 * The High School object which contains the average data from it's students which meet the requirments
 */
cs441GoogleMapsViz.highShool.highSchool = function(ceeb, name, state, latitude, longatude) {
	
	this.ceeb = ceeb;
	this.name = name;
	this.state = state;
	
	this.applied = 0;
	this.accepted = 0;
	this.enrolled = 0;
	this.inquired = 0;
	this.avgGpa = 0;
	this.avgSat = 0;
	
	this.lat = latitude;
	this.lng = longatude;

	// The number of students which meet the filter results.
	// We will only be displaying schools which have 1 or more students
	this.students = 0;
	
	this.isActive = true;

};

/**
 * highschoolsResponse
 * 
 * This function is called when a query to the high schools database has completed.
 * It creates a highschool object for each highschool in the list that it gets back
 */
function highschoolsResponse() {

	// if there was not an error
	if (cs441GoogleMapsViz.HShttpRequest.readyState === 4) {
		if(cs441GoogleMapsViz.HShttpRequest.status === 200) {

			// The response is just a string.  I need
			// to parse it so that I can extract the zip code from it.
			var response = JSON.parse(cs441GoogleMapsViz.HShttpRequest.responseText);

			// Create an empty list of schools
			// cs441GoogleMapsViz.schools = {};
			
			// for every school in the database, add an entry in our schools list with ceeb, name, and location.
			for(var i = 0; i < response.rows.length; i++) {
				var hs = response.rows[i];
				var ceeb = hs[0];
				
				cs441GoogleMapsViz.highSchools[ceeb] = new cs441GoogleMapsViz.highShool.highSchool(hs[0], hs[1], hs[2], hs[3], hs[4]);
				
			}
			
			console.log(cs441GoogleMapsViz.highSchools);
			
			//now find out how many students go to each school
			cs441GoogleMapsViz.updateHighSchools();
		}
	}
}

// Constuct the query to the high schools server
var schoolEID = '1UpGFeVsC_oQlHGb96-1S4k1rYSp61v8RHynC1hs';	
var query = "SELECT 'CEEB', 'School', 'State', 'Latitude', 'Longitude' FROM " + schoolEID;

// backup api key
cs441GoogleMapsViz.apikey = 'AIzaSyCGPkL4Q0Ki278FcPmJAjlMIzwQPtyiLdk';

// Construct the URL for the high school database query
var url = "https://www.googleapis.com/fusiontables/v1/query";
url = url + "?sql=";
url = url + query;
url = url + " &key=" + cs441GoogleMapsViz.apikey;



// Send the GET Request to the Google Server
cs441GoogleMapsViz.HShttpRequest = new XMLHttpRequest();
cs441GoogleMapsViz.HShttpRequest.onreadystatechange = highschoolsResponse;
cs441GoogleMapsViz.HShttpRequest.open('GET', url);
cs441GoogleMapsViz.HShttpRequest.send();

//alert("HS Database Loaded");
