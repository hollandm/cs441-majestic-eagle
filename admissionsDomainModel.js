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
	
	cs441GoogleMapsViz.refreshStats();

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
	
	var filter = cs441GoogleMapsViz.filterList[filterName];
	
	// update isActive status of specified filter
	filter.isActive = true;
	filter.input = inputText;
	
	if (filterName == "High School") {
		cs441GoogleMapsViz.parseToCatagoricalFilter(filter);
	}
	
	
	cs441GoogleMapsViz.refreshStats();
	
	// TODO: update input
		
	
	// TODO: update high school information
	
	
};

