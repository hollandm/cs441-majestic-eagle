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
cs441GoogleMapsViz.highSchools = [];


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
	var activeFilters = cs441GoogleMapsViz.filterList;

	for(var i = 0; i < cs441GoogleMapsViz.allFilters.length; i++){
		key = cs441GoogleMapsViz.allFilters[i];
		if (cs441GoogleMapsViz.filterList[key].isActive == false){
			delete activeFilters[key];
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
	var inactiveFilters = cs441GoogleMapsViz.filterList;
	for(var i = 0; i < cs441GoogleMapsViz.allFilters.length; i++){
		key = cs441GoogleMapsViz.allFilters[i];
		if (cs441GoogleMapsViz.filterList[key].isActive == true){
			alert("hi");

			delete inactiveFilters[key];
		}
	}

	return inactiveFilters;
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
	
	//remove from display (done by controller...not model...)
	
	//refilter high school information

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
	
	// update input
	
	// update high school information
	
	
};


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
	// Refresh Stats here
	
	// Set highSchools to inActive
	for(var i = 0; i < highSchools.length; i++) {
		if(filterList["HS"].isActive && filterList["HS"].name != highSchools[i].name) {
			highSchools[i].isActive = false;
		}
		else {
			highSchools[i].isActive = false;
		}
		if (highSchools[i].students <= 0) {
			highSchools[i].isActive = false;
		}
		else {
			highSchools[i].isActive = false;
		}
	}
};

