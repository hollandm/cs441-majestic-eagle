/*
 *  admissionsDomainModel.js
 *
 *  A collection of objects and functions to model and update the admissions data.
 *
 *  @author Taylor W. Nightingale and Sherry Liao
 */

/* From JavaScript patterns by S. Stefanov,
 *    "As the complexity of a program grows and some parts of the code
 * get split into different files, it becomes unsafe to just assume that
 * your code is first.  Therefore, before adding a property or creating
 * a namespace, it's best to check first that it doesn't already exist"
 */
var cs441GoogleMapsViz = cs441GoogleMapsViz || {};


/*
 * filters
 * This is initialized in usmap.js
 * 
 * A list that represents all of the filters.
 */
cs441GoogleMapsViz.filterList = {};


/*
 * highSchools
 * This is initialized in usmap.js
 * 
 * A list of all the high schools
 */
cs441GoogleMapsViz.highSchools = {};

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
cs441GoogleMapsViz.studentsDatabaseKey = '13na5H4_enS7_zftNnAhsd1JWpgDBVv6tg5P_624';


/*
 * cs441GoogleMapsViz.getActiveFilters()
 * 
 * This supplies a list of the current valid filters that are being applied
 * That is, any filter which has the isActive attribute set to true.
 * 
 * @param none
 * @return the list of active filters
 */
cs441GoogleMapsViz.getActiveFilters = function() {
	var activeFilters = {};
	var filters = cs441GoogleMapsViz.filterList;
	
	for(var i = 0; i < cs441GoogleMapsViz.allFilters.length; i++){
		key = cs441GoogleMapsViz.allFilters[i];
		if (filters[key].isActive == true){
			activeFilters[key] = filters[key];
		}
	}
	return activeFilters;
};

/*
 * cs441GoogleMapsViz.getInactiveFilters()
 * 
 * This supplies a list of the current filters that can be applied.
 * That is, any filter which has the isActive attribute set to false.
 * 
 * @param none
 * @return the list of inactive filters
 */
cs441GoogleMapsViz.getInactiveFilters = function() {
	var inActiveFilters = {};
	var filters = cs441GoogleMapsViz.filterList;
	
	for(var i = 0; i < cs441GoogleMapsViz.allFilters.length; i++){
		key = cs441GoogleMapsViz.allFilters[i];
		if (filters[key].isActive == false){
			inActiveFilters[key] = filters[key];
		}
	}
	return inActiveFilters;
};

/*
 * cs441GoogleMapsViz.removeFilter()
 * 
 * Sets the passed in filters to inactive. 
 * Updates the high school information accordingly.
 *
 * @param filterName The name of the filter to remove
 * @return void
 */
cs441GoogleMapsViz.removeFilter = function(filterName) {
	//udpate isActive status
	cs441GoogleMapsViz.filterList[filterName].isActive = false;
	
	//TODO:refilter high school information

};

/*
 * cs441GoogleMapsViz.addFilter()
 * 
 * Sets the passed in filter to active, and updates the 
 * filter with the correct values.
 * Updates the high school information accordingly.
 * 
 * @param filterName The name of the filter to add
 * @param inputText is the text that was in the text box
 * @return void 
 */
cs441GoogleMapsViz.addFilter = function(filterName, inputText){
	// update isActive status of specified filter
	cs441GoogleMapsViz.filterList[filterName].isActive = true;
	cs441GoogleMapsViz.filterList[filterName].input = inputText.toUpperCase(); ;	
	
	cs441GoogleMapsViz.refreshStats()
	
	// TODO: update input
		
	
	// TODO: update high school information
	
	
};


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

/**
 * generateFiltersString
 * 
 * generates a string to append to a SQL query to filter the results with the filters the 
 * 		user has selected
 */
cs441GoogleMapsViz.generateFiltersString = function() {
	//TODO: All of it
	
	var filterString = "";
	
	if (cs441GoogleMapsViz.filterList["High School"].isActive) {
		
		var hsName = cs441GoogleMapsViz.filterList["High School"].input;
		
		console.log(hsName);
		
		var found = false;
		for (ceeb in cs441GoogleMapsViz.highSchools) {
			if (cs441GoogleMapsViz.highSchools[ceeb].name == hsName) {
				if (found == false) {
					filterString += " WHERE HighSchoolCode = " + ceeb;
					found = true;
				}
				break;
			}
		}	
		
		if (!found) {
			alert("Warning: High School \"" + hsName + "\" was not found.");
		}
		
	} else {
		
	}
	
	return filterString;
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
	
	//TODO: set number of students of all high schools to 0
	//TODO: set all high schools to inactive
	for (ceeb in cs441GoogleMapsViz.highSchools) {
		var school = cs441GoogleMapsViz.highSchools[ceeb];
		school.students = 0;
		school.isActive = false;	
	}
	
	
	var httpRequest = new XMLHttpRequest();
	var query = "SELECT 'HighSchoolCode' FROM " + cs441GoogleMapsViz.studentsDatabaseKey;
			// +  " WHERE HighSchoolCode > 0";
			
	query += cs441GoogleMapsViz.generateFiltersString();
	
	console.log(query);
	
	function hsCallback() {
		if (httpRequest.readyState === 4) {
			if(httpRequest.status === 200) {
		
				var response = JSON.parse(httpRequest.responseText);
		
				console.log(response);
		
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
		
				//TODO: Try to find a way to remove this from the model
				cs441GoogleMapsViz.displayMapMarkers();	
		
			}
		}
	}
	
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
		
	query += cs441GoogleMapsViz.generateFiltersString();
			
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

