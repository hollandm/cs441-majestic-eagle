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
cs441GoogleMapsViz.filters = {
	"GPA": ["GPA"], 
	"High School": ["HS"], 
	"Declared Major": ["MAJOR"], 
	"SAT (Math and Reading)": ["SAT"]
};


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
	//TODO: implement
	return cs441GoogleMapsViz.filters;
};

/*
 * cs441GoogleMapsViz.getInctiveFilters()
 * 
 * This supplies a list of the current filters that can be applied.
 * That is, any filter which has the isActive attribute set to false.
 * 
 * @param none
 * @return the list of inactive filters
 */
cs441GoogleMapsViz.getInactiveFilters = function() {
	//TODO: implement
	return cs441GoogleMapsViz.filters;	
};

/*
 * cs441GoogleMapsViz.removeFilter()
 * 
 * Sets the passed in filters to inactive. 
 * Updates the high school information accordingly.
 *
 * @param filterID The string value of the filter to remove
 * @return void
 */
css441GoogleMapsViz.clearFilter = function(filterID) {
	//TODO: implement
};

/*
 * cs441GoogleMapsViz.addFilter()
 * 
 * Sets the passed in filter to active, and updates the 
 * filter with the correct values.
 * Updates the high school information accordingly.
 * 
 * @param filterID The string value of the filter to add
 * @return void 
 */
cs441GoogleMapsViz.addFilter = function(filterID){
	//TODO: implement
	
	delete cs441GoogleMapsViz.filters[filterType];
	cs441GoogleMapsViz.selectedFilters[filterType] = [filterID]; 
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
cs441GoogleMapsViz.updateHighSchools() = function() {
	//TODO: implement
};
