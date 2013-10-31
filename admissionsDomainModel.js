/*
 *  admissionsDomainModel.js
 *
 *  A collection of objects and functions to model and update the admissions data.
 *
 *  @author Taylor W. Nightingale
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
 * TODO: moddify this to be a list of Filter objects
 * 
 * A list that represents all of the filters.
 */
cs441GoogleMapsViz.filterList = {};


/*
 * highSchools
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
 * @return void 
 */
cs441GoogleMapsViz.addFilter = function(filterName){
	// update isActive status of specified filter
	cs441GoogleMapsViz.filterList[filterName].isActive = true;	
	
	// update input
	
	// update high school information
	
	
};


/*
 * cs441GoogleMapsViz.updateHighSchools()
 * 
 * Updates the High School information based on the active filters
 * TODO: Add more documentation regarding the nature of udating h.s. 
 *
 * @param none
 * @return void 
 */
cs441GoogleMapsViz.updateHighSchools = function() {
	//TODO: implement
};

