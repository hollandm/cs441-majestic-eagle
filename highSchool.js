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
cs441GoogleMapsViz.highShool.highSchool = function(ceeb, name, state, latitude, longatude) {
	
	this.ceeb = ceeb;
	this.name = name;
	this.state = state;
	this.lat = latitude;
	this.lng = longatude;

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
				
				cs441GoogleMapsViz.schools[hs[0]] = new cs441GoogleMapsViz.highShool.highSchool(hs[0], hs[1], hs[2], hs[3], hs[4]);
				
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
				
				
				// For every school with students, add a marker to the map
				//for (var i = 0; i < cs441GoogleMapsViz.schools.length; ++i) {
				console.log("begin for loop");
				console.log(cs441GoogleMapsViz.map);
				for (ceeb in cs441GoogleMapsViz.schools) {
					var school = cs441GoogleMapsViz.schools[ceeb];
					var myLatlng = new google.maps.LatLng(school.lat,school.lng);
					
					//console.log("Creating Marker for " + school.name + ", " + school.state);	
					var marker = new google.maps.Marker({
						map: cs441GoogleMapsViz.map,
						position: myLatlng,
						title: school.name + ", " + school.state
					});
					
				}	
				console.log("end for loop");
				
				
								/*
					var i = 1;
					var school = cs441GoogleMapsViz.schools[i];
					console.log(cs441GoogleMapsViz.schools[i])
					var address = school.location;
					
					cs441GoogleMapsViz.geocoder.geocode( { 'address': address}, function(results, status) {
						console.log('Geocode');
						if (status == google.maps.GeocoderStatus.OK) {
							//map.setCenter(results[0].geometry.location);
							var marker = new google.maps.Marker({
								map: cs441GoogleMapsViz.map,
								position: results[0].geometry.location,
								title: 'Hello World!'
							});
						} else {
							console.log('Geocode was not successful for the following reason: ' + status);
							//alert('Geocode was not successful for the following reason: ' + status);
						}
					});

				//}
					
					var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

					var marker = new google.maps.Marker({
						position: myLatlng,
						map: cs441GoogleMapsViz.map,
						title: 'Hello World!'
					});
				//}

				
				*/
				
				// debug prints
				//console.log(response)
				//console.log(cs441GoogleMapsViz.schools);	
			}
		}
	}
	
	
	
	// We want the the ceeb of all the students that meet our filters
	var query = "SELECT 'HighSchoolCode' FROM 13na5H4_enS7_zftNnAhsd1JWpgDBVv6tg5P_624 WHERE HighSchoolCode > 0";
	

	//TODO: Add Filter Code Here
	//
	//Example:
	//query += " AND WHERE HS_GPA = 4"	
	
	if (cs441GoogleMapsViz.filterList["High School"].isActive) {
		var hsName = cs441GoogleMapsViz.filterList["High School"].name;
		for (ceeb in cs441GoogleMapsViz.schools) {
			if (cs441GoogleMapsViz.schools[ceeb].input == hsName) {
				query += " AND 'CEEB' == " + ceeb;
				break;
			}
		}	
		
	}
	

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
//var schoolEID = '1TysRKf1siV396AMbUKmi8w2-XB3Zeye2ObXjl8Y';	
var schoolEID = '1UpGFeVsC_oQlHGb96-1S4k1rYSp61v8RHynC1hs';	
var query = "SELECT 'CEEB', 'School', 'State', 'Latitude', 'Longitude' FROM " + schoolEID;

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
