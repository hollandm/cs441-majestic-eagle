/**
 * databases.js
 * 
 * This file contains code for the project to reference and access the databases 
 * 
 * @author Matt Holland
 * @since November 1st, 2013
 */


/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapViz = cs441GoogleMapsViz || {};


/*
 * schoolDatabseKey
 * 
 * This is used to address queries to the schools database
 */
cs441GoogleMapsViz.schoolsDatabaseKey = '1KliuZhCJ4hrnXxGNohfkdAea2MZuJwR7w6BLag4';

/*
 * studentsDatabseKey
 * 
 * This is used to address queries to the schools database
 */
cs441GoogleMapsViz.studentsDatabaseKey = '14e_kQ0zQSC-UegJ4-1FtuCuB-3ByCD4wblXfjzQ';
//'13na5H4_enS7_zftNnAhsd1JWpgDBVv6tg5P_624';


/*
 * fusionQuery
 * 
 * Given the query string we construct the url to call
 * 
 * @param query: the string of the SQL query we will use
 * 
 * @param httpRequest: the XMLHttpRequest object that we will be modifying
 * 
 * @param callback: the function to be used on callback
 */
cs441GoogleMapsViz.fusionQuery = function (query, httpRequest, callback) {
	
	var url = "https://www.googleapis.com/fusiontables/v1/query";
	url = url + "?sql=";
	url = url + query;
	url = url + " &key=" + cs441GoogleMapsViz.apikey;
	
	httpRequest.onreadystatechange = callback;
	httpRequest.open('GET', url);
	httpRequest.send();
	
};

/*
 * cs441GoogleMapsViz.refreshStats()
 * 
 * Updates the High School information based on the active filters.

 * That is, each highSchool will either update it's information based on the filters,
 * or it will be made inactive based on the following:
 * 		-There are no students that meet the criteria.
 *
 * @param none
 * @return void 
 */
cs441GoogleMapsViz.refreshStats = function() {
	
	for (ceeb in cs441GoogleMapsViz.highSchools) {
		var school = cs441GoogleMapsViz.highSchools[ceeb];
		school.students = 0;
		school.isActive = false;	
	}
	
	
	var httpRequest = new XMLHttpRequest();
	var query = "SELECT 'HighSchoolCode' FROM " + cs441GoogleMapsViz.studentsDatabaseKey;
			
	query += cs441GoogleMapsViz.generateFiltersString();
	
	console.log(query);
	
	function hsCallback() {
		if (httpRequest.readyState === 4) {
			if(httpRequest.status === 200) {
		
				var response = JSON.parse(httpRequest.responseText);
		
				console.log(response);
			
				if (response.rows != undefined) {
					
					//for every student, add one to their high school students count
					for(var i = 0; i < response.rows.length; i++) {
						var ceeb = response.rows[i];
						
						if (typeof cs441GoogleMapsViz.highSchools[ceeb] != 'undefined') {
							cs441GoogleMapsViz.highSchools[ceeb].students += 1;
							cs441GoogleMapsViz.highSchools[ceeb].isActive = true;
							
						} else {
							//console.log("Invalid CEEB: "+ceeb);
						}	
					};
					
				}

				//We are done loading! lets hide the loading bar now.
				cs441GoogleMapsViz.hideLoadingBar();
		
				//TODO: Try to find a way to remove this from the model
				cs441GoogleMapsViz.displayMapMarkers();	
		
			}
		}
	}
	
	//We are about to load, lets show the loading bar so the user isn't confused'.
	cs441GoogleMapsViz.showLoadingBar();
	
	cs441GoogleMapsViz.fusionQuery(query, httpRequest, hsCallback);	
	
};

/*
 * cs441GoogleMapsViz.initalizeHighSchools()
 * 
 * Loads the static information of every high school into the program from the database
 * For every high school we will create a highSchool object, place our static info within it, 
 * and then add the high school object to our highSchools list using its CEEB as the index
 * 
 * @param none
 * @return void 
 */
cs441GoogleMapsViz.initalizeHighSchools = function() {
	
	var httpRequest = new XMLHttpRequest();
	var query = "SELECT 'CEEB', 'School', 'State', 'Latitude', 'Longitude' FROM " + cs441GoogleMapsViz.schoolsDatabaseKey;
		
	function hsCallback() {
		if (httpRequest.readyState === 4) {
			if(httpRequest.status === 200) {
		
				var response = JSON.parse(httpRequest.responseText);
	
	
				// for every school in the database
				for(var i = 0; i < response.rows.length; i++) {
					var hs = response.rows[i];
					
					var ceeb = hs[0];
					//hs[1] is name
					//hs[2] is state
					//hs[3] is latitude
					//hs[4] is longitude
					
					// add an entry in our schools list with ceeb, name, and location.
					cs441GoogleMapsViz.highSchools[ceeb] 
						= new cs441GoogleMapsViz.highSchool(ceeb, hs[1], hs[2], hs[3], hs[4]);
					
				}
				
				//now find out how many students go to each school
				cs441GoogleMapsViz.refreshStats();
		
			}
		}
	}
	
	cs441GoogleMapsViz.fusionQuery(query, httpRequest, hsCallback);	
	
};


/*
 * cs441GoogleMapsViz.updateHighSchool()
 * 
 * Updates the information of the given High School based on the active filters.
 * That is, each highSchool will either update it's information based on the filters,
 *
 * @param none
 * @return void 
 */
cs441GoogleMapsViz.updateHighSchool = function(ceeb) {
	
	//TODO: set number of students of all high schools to 0
	//TODO: set all high schools to inactive
	
	var httpRequest = new XMLHttpRequest();
	var query = "SELECT 'HS_GPA', 'SAT_Verbal', 'SAT_MAth', 'App_Decision_Code', 'Enrolled' FROM " + cs441GoogleMapsViz.studentsDatabaseKey 
			+  " WHERE HighSchoolCode = " + ceeb;
	
	
	console.log(query);
	
	function hsCallback() {
		if (httpRequest.readyState === 4) {
			if(httpRequest.status === 200) {
		
				var response = JSON.parse(httpRequest.responseText);
				console.log(response);
		
				
				var school = cs441GoogleMapsViz.highSchools[ceeb];
				// console.log(ceeb);
				// console.log(school);
				
				// Reset the schools stats
				cs441GoogleMapsViz.resetStats(school);
		
				//The number of people to take the average 		
				var gpaCounted = 0;
				var satCounted = 0;
		
						
				//for every student, add one to their high school students count
				for(var i = 0; i < response.rows.length; i++) {
					var student = response.rows[i];
					
					var gpa = student[0];
					if (!isNaN(gpa)) {
						gpa = Number(gpa);
						school.avgGpa += gpa;
						gpaCounted += 1;
					}
					
					var satM = student[1];
					var satR = student[2];
					if(!(isNaN(satM) || isNaN(satR))) {
						satR = Number(satR);
						satM = Number(satM);
						var sat = (satM + satR);
						school.avgSat += sat;
						satCounted += 1;
					}
					
					
					var appDecision = student[3];
					//console.log("appDecision: " + appDecision);
					if (appDecision == 'A') {
						school.accepted += 1;
					}
					
					//if anything happend with an application then they must have applied
					if (appDecision != undefined && appDecision != '' ) {
						school.applied += 1;
					}
					
					//console.log("appEnrolled: " + appEnrolled);
					var appEnrolled = student[4];
					if (appEnrolled == 'Y') {
						school.enrolled += 1;
					}
					
					school.inquired += 1;
				};
							
				//Averaging SAT and GPA
				if (school.avgGpa != 0) {
					school.avgGpa /= gpaCounted;
					school.avgGpa = school.avgGpa.toFixed(2);
				}
				if (school.avgSat != 0) {
					school.avgSat /= satCounted;
					school.avgSat = Math.floor(school.avgSat);
				}
			
				
				cs441GoogleMapsViz.setMarkerInfo(school);
			}
		}
	}
	
	cs441GoogleMapsViz.fusionQuery(query, httpRequest, hsCallback);		
};

