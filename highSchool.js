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
 * This object models a high school and how it is displayed.
 * The object has several "static" attributes that should not change
 * over the life of the object:
 * 		-ceeb  : The number which maps to a high school (int)
 * 		-name  : The name of the high school (string)
 * 		-state : An acronmym for a state in the United States of America
 * 				 e.g. "OR", "MI", "WA" (string)
 * 
 * The other attributes will by "dynamic" in that they will change over
 * the life of the object. These will change based on the current filters:
 * 		-applied  : The number of students who meet 
 * 					the current filters and have applied (int)
 * 		-accepted : The number of students who meet 
 * 					the current filters and have accepted (int)
 * 		-enrolled : The number of students who meet 
 * 					the current filters and have enrolled (int)
 * 		-inquired : The number of students who meet 
 * 					the current filters and have inquired (int)
 * 		-avgGpa   : The mean GPA of students who meet the
 * 					current filters (double)
 * 		-avgSat   : The mean SAT (reading and math combined) of
 * 					students who meet the current filters (int)
 * 		-students : The total number of students who meet the current filter criteria (int)
 * 		-isActive : Whether or not the high school will be shown. This value 
 *  				will be false if 'students' is 0 or if it is being filtered out
 * 					by the 'highSchool' filter (boolean)
 * 
 */
cs441GoogleMapsViz.highShool.highSchool = function(ceeb, name, state, latitude, longatude) {
	
	this.ceeb = ceeb;
	this.name = name;
	this.state = state;
	this.lat = latitude;
	this.lng = longatude;

	this.applied = 0;
	this.accepted = 0;
	this.enrolled = 0;
	this.inquired = 0;
	
	this.avgGpa = 0;
	this.avgSat = 0;
	
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
};
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
