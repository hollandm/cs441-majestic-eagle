/**
 * highSchool.js
 *
 * This file contains code to fetch and store the high school data. 
 *  
 * @author Matt Holland
 * @since October 27th, 2013
 */

var cs441GoogleMapsViz = cs441GoogleMapsViz || {};

cs441GoogleMapsViz.highShool = {};

/**
 * highSchool
 *
 * The High School object which contains the average data from it's students which meet the requirments
 */
cs441GoogleMapsViz.highShool.highSchool = function(ceeb, name, location) {
	
	this.ceeb = ceeb;
	this.name = name;
	this.location = location;

	//The number of students which meet the filter results, We will only be displaying schools which have 1 or more students
	this.students = 0;

}

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
			cs441GoogleMapsViz.schools = {}
			
			// for every school in the database, add an entry in our schools list with ceeb, name, and location.
			for(var i = 0; i < response.rows.length; i++) {
				var hs = response.rows[i];
				
				cs441GoogleMapsViz.schools[hs[0]] = new cs441GoogleMapsViz.highShool.highSchool(hs[0], hs[1], hs[2]);
				
			}
			
			console.log(cs441GoogleMapsViz.schools)
			
			//now find out how many students go to each school
			cs441GoogleMapsViz.highShool.refreshStats()
			
		} 
	}
}

/**
 * refreshStats
 * 
 * queries the students database to find out how many students at each school
 * meet the filter criterea
 * 
 */
cs441GoogleMapsViz.highShool.refreshStats = function() {

	// Create the function to call when the query response is recieved	
	function respondStats() {
		// If we didn't have an error
		if (cs441GoogleMapsViz.statsHttpRequest.readyState === 4) {
			if(cs441GoogleMapsViz.statsHttpRequest.status === 200) {
		
				var response = JSON.parse(cs441GoogleMapsViz.statsHttpRequest.responseText);
				
				//for every student, add one to their high school students count
				for(var i = 0; i < response.rows.length; i++) {
					var ceeb = response.rows[i];
					
					if (typeof cs441GoogleMapsViz.schools[ceeb] != 'undefined') {
						cs441GoogleMapsViz.schools[ceeb].students += 1;
					} else {
						//console.log("Invalid CEEB: "+ceeb);
					}	
				}
				
				// debug prints
				console.log(response)
				console.log(cs441GoogleMapsViz.schools);	
			}
		}
	}
	
	// We want the the ceeb of all the students that meet our filters
	var query = "SELECT 'HighSchoolCode' FROM 13na5H4_enS7_zftNnAhsd1JWpgDBVv6tg5P_624 WHERE HighSchoolCode > 0";
	

	//TODO: Add Filter Code Here
	//
	//Example:
	//query += " AND WHERE HS_GPA = 4"	

	// Construct the URL to send the query
	var url = "https://www.googleapis.com/fusiontables/v1/query";
	url = url + "?sql=";
	url = url + query;
	url = url + " &key=" + cs441GoogleMapsViz.apikey;
	
	// Send the query
	cs441GoogleMapsViz.statsHttpRequest = new XMLHttpRequest();
	cs441GoogleMapsViz.statsHttpRequest.onreadystatechange = respondStats;
	cs441GoogleMapsViz.statsHttpRequest.open('GET', url);
	cs441GoogleMapsViz.statsHttpRequest.send();

}


// Constuct the query to the high schools server
var schoolEID = '1TysRKf1siV396AMbUKmi8w2-XB3Zeye2ObXjl8Y';	
var query = "SELECT 'Code', 'HighSchool', 'Address' FROM " + schoolEID;

// backup api key
cs441GoogleMapsViz.apikey = 'AIzaSyCGPkL4Q0Ki278FcPmJAjlMIzwQPtyiLdk'

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
