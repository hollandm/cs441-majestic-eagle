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
cs441GoogleMapsViz.schoolsDatabaseKey = '1UpGFeVsC_oQlHGb96-1S4k1rYSp61v8RHynC1hs';

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
	cs441GoogleMapsViz.filterList[filterName].input = inputText;	
	
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
	
	cs441GoogleMapsViz.apikey = 'AIzaSyCGPkL4Q0Ki278FcPmJAjlMIzwQPtyiLdk';
	
	var url = "https://www.googleapis.com/fusiontables/v1/query";
	url = url + "?sql=";
	url = url + query;
	url = url + " &key=" + cs441GoogleMapsViz.apikey;
	
	httpRequest.onreadystatechange = callback;
	httpRequest.open('GET', url);
	httpRequest.send();
	
}

/*
 * cs441GoogleMapsViz.updateHighSchools()
 * 
 * Updates the High School information based on the active filters.
 * That is, each highSchool will either update it's information based on the filters,
 * or it will be deleted based on the following:
 * 		-There are no students that meet the criteria.
 * 		-The "High School" filter is active and filtering out the High School 
 *
 * @param none
 * @return void 
 */
cs441GoogleMapsViz.updateHighSchools = function() {
	
	//TODO: set number of students of all high schools to 0
	//TODO: set all high schools to inactive
	
	var httpRequest = new XMLHttpRequest();
	var query = "SELECT 'HighSchoolCode' FROM " + cs441GoogleMapsViz.studentsDatabaseKey 
			+  " WHERE HighSchoolCode > 0";
			
	//TODO: add to query to support filters
			
	// if (cs441GoogleMapsViz.filterList["High School"].isActive) {
		// var hsName = cs441GoogleMapsViz.filterList["High School"].name;
		// for (ceeb in cs441GoogleMapsViz.schools) {
			// if (cs441GoogleMapsViz.schools[ceeb].input == hsName) {
				// query += " AND 'CEEB' == " + ceeb;
				// break;
			// }
		// }	
// 		
	// }
			
	function hsCallback() {
		if (httpRequest.readyState === 4) {
			if(httpRequest.status === 200) {
		
				var response = JSON.parse(httpRequest.responseText);
		
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
						= new cs441GoogleMapsViz.highShool.highSchool(ceeb, hs[1], hs[2], hs[3], hs[4]);
					
				}
				
				//now find out how many students go to each school
				cs441GoogleMapsViz.updateHighSchools();
		
			}
		}
	}
	
	cs441GoogleMapsViz.fusionQuery(query, httpRequest, hsCallback);	
	
};


